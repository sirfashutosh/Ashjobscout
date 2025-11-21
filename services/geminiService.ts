import { GoogleGenAI } from "@google/genai";
import { Company, StreamUpdate, DataSource } from "../types";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function* streamJobData(query: string, source: DataSource, excludeNames: string[] = []): AsyncGenerator<StreamUpdate, void, unknown> {
  
  const model = "gemini-2.5-flash";
  
  const exclusionText = excludeNames.length > 0 
    ? `\nIMPORTANT: Do NOT include the following companies as they have already been listed: ${excludeNames.join(', ')}.` 
    : '';

  let specificPrompt = "";

  if (source === 'YC') {
    specificPrompt = `
    Context: Search specifically for Y Combinator (YC) companies.
    Task: Find exactly 10 NEW YC companies matching the query.
    Data Source: Use Google Search to find YC directory listings, "Work at a Startup", or company career pages.
    Batch Field: Include the YC Batch (e.g., W24, S23) if found.
    Link Strategy: PREFER direct ATS links (Greenhouse, Lever, Ashby, etc.) or the Company's main 'Careers' page.
    `;
  } else {
    specificPrompt = `
    Context: Search for active job listings on LinkedIn or companies actively hiring on LinkedIn.
    Task: Find exactly 10 NEW companies with open roles relevant to the query.
    Data Source: Use Google Search to find "site:linkedin.com/jobs" or "site:linkedin.com/company" pages.
    Batch Field: Set the 'batch' field to "LinkedIn".
    Link Strategy: Use the LinkedIn Job Posting URL or the Company's Careers page.
    `;
  }

  const prompt = `
    You are a specialized data extraction assistant (Ash Job Scout).
    
    The user query is: "${query}"
    ${specificPrompt}

    General Instructions:
    1. Search and identify relevant companies/jobs.
    2. ${exclusionText}
    3. For each company, FIRST output a log message, THEN output the data.
    
    Output Format Rules:
    - **Logs**: Start lines with "LOG: " followed by a brief progress update.
    - **Data**: Output the company data as **JSON objects**.
    - You may output NDJSON (one per line) or formatted JSON.
    - **Do NOT** output a single large JSON array wrapping all items. Output individual objects.
    - **Do NOT** construct fake URLs. Only use URLs found in search.

    JSON Structure:
    {
      "name": "Company Name",
      "description": "Short 1-sentence description",
      "website": "https://...",
      "batch": "e.g., W24 or LinkedIn",
      "tags": ["tag1", "tag2"],
      "jobs": [
        {
          "title": "Job Title",
          "type": "Full-time",
          "salary": "$150k - $200k",
          "location": "Location",
          "link": "VALID_URL_ONLY"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1,
      },
    });

    let buffer = '';
    let braceBalance = 0;
    let inString = false;
    let isEscaped = false;
    let jsonStartIndex = -1;

    for await (const chunk of response) {
      const text = chunk.text;
      if (!text) continue;

      // 1. Handle LOG messages immediately (simple line scan)
      const lines = text.split('\n');
      for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('LOG:')) {
              yield { type: 'log', message: trimmed.substring(4).trim() };
          }
      }

      // 2. Accumulate for JSON parsing
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        buffer += char;

        // Simple state machine to track JSON object boundaries
        if (inString) {
          if (char === '\\' && !isEscaped) {
            isEscaped = true;
          } else if (char === '"' && !isEscaped) {
            inString = false;
          } else {
            isEscaped = false;
          }
        } else {
          if (char === '"') {
            inString = true;
          } else if (char === '{') {
            if (braceBalance === 0) {
                jsonStartIndex = buffer.length - 1;
            }
            braceBalance++;
          } else if (char === '}') {
            braceBalance--;
            
            // Found a potential complete JSON object
            if (braceBalance === 0 && jsonStartIndex !== -1) {
                const potentialJson = buffer.substring(jsonStartIndex);
                
                try {
                    // Attempt to clean and parse
                    let cleanJson = potentialJson.trim();
                    // Remove trailing commas if they exist outside strings (simple check)
                    if (cleanJson.endsWith(',')) cleanJson = cleanJson.slice(0, -1);
                    
                    const company = JSON.parse(cleanJson);
                    
                    // Verify it has expected fields to be a Company
                    if (company && company.name) {
                        yield { type: 'company', data: company as Company };
                        // Clear buffer up to this point to keep memory low
                        buffer = '';
                        jsonStartIndex = -1;
                    }
                } catch (e) {
                    // Not valid JSON yet, or false positive. Continue accumulating.
                    // We don't reset buffer here because it might be part of a larger structure
                    // that we miscounted, although with balanced braces usually it's a parse error.
                }
            }
          }
        }
      }
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}