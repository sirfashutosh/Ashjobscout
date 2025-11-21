import { Company, Job } from "./types";

/**
 * Cleans a raw string response from the LLM to extract the JSON array.
 * Removes markdown code blocks ```json ... ```
 */
export const extractJsonFromResponse = (text: string): any[] => {
  try {
    let cleanText = text.trim();
    
    // Remove opening markdown
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.substring(7);
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.substring(3);
    }

    // Remove closing markdown
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.substring(0, cleanText.length - 3);
    }

    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse JSON from response:", e);
    console.error("Raw text:", text);
    throw new Error("Could not parse company data. The model response was not valid JSON.");
  }
};

export const formatCurrency = (value: string) => {
  if (!value) return 'N/A';
  return value; 
};

// --- New Helpers for Stats & Download ---

export type JobCategory = 'Engineering' | 'Design' | 'Product' | 'Sales/Marketing' | 'AI/Data' | 'Operations' | 'Other';

export const categorizeJob = (title: string): JobCategory => {
  const t = title.toLowerCase();
  if (t.match(/software|developer|engineer|frontend|backend|full stack|stack|web|ios|android/)) return 'Engineering';
  if (t.match(/design|ui|ux|creative|artist/)) return 'Design';
  if (t.match(/product|manager|head of product/)) return 'Product';
  if (t.match(/sales|marketing|sdr|account|growth|business dev/)) return 'Sales/Marketing';
  if (t.match(/data|ai|ml|machine learning|scientist|analyst/)) return 'AI/Data';
  if (t.match(/ops|operations|finance|hr|people|legal|admin/)) return 'Operations';
  return 'Other';
};

export const getJobStats = (companies: Company[]) => {
  const stats: Record<JobCategory, number> = {
    'Engineering': 0,
    'AI/Data': 0,
    'Sales/Marketing': 0,
    'Product': 0,
    'Design': 0,
    'Operations': 0,
    'Other': 0
  };

  let totalJobs = 0;

  companies.forEach(company => {
    company.jobs.forEach(job => {
      const category = categorizeJob(job.title);
      stats[category]++;
      totalJobs++;
    });
  });

  return { stats, totalJobs };
};

export const generateCSV = (companies: Company[]): string => {
  const headers = ['Company Name', 'Batch', 'Website', 'Description', 'Job Title', 'Location', 'Salary', 'Apply Link'];
  const rows: string[] = [];

  rows.push(headers.join(','));

  companies.forEach(company => {
    if (company.jobs.length === 0) {
      // Add company row even if no jobs
      rows.push([
        `"${company.name.replace(/"/g, '""')}"`,
        `"${company.batch || ''}"`,
        `"${company.website || ''}"`,
        `"${company.description.replace(/"/g, '""')}"`,
        "No Openings",
        "",
        "",
        ""
      ].join(','));
    } else {
      company.jobs.forEach(job => {
        rows.push([
          `"${company.name.replace(/"/g, '""')}"`,
          `"${company.batch || ''}"`,
          `"${company.website || ''}"`,
          `"${company.description.replace(/"/g, '""')}"`,
          `"${job.title.replace(/"/g, '""')}"`,
          `"${job.location || ''}"`,
          `"${job.salary || ''}"`,
          `"${job.link || ''}"`
        ].join(','));
      });
    }
  });

  return rows.join('\n');
};

export const downloadData = (companies: Company[], filename = 'ash-jobs.csv') => {
  const csvContent = generateCSV(companies);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};