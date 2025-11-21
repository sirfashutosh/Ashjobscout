Ash Job Scout – YC Job Intelligence App

A smart, AI-powered dashboard that scouts YC startup companies, extracts founders & roles, and helps you apply faster and smarter.


🧠 What This App Does

Ash Job Scout is a personal YC job-hunting assistant that automates everything:

You paste any Y Combinator company link

The app automatically fetches:

✅ Company Name

✅ Industry

✅ Website

⚡ Founder Name(s)

⚡ Open job roles

Gemini AI processes the extracted data and returns neatly structured insights.

You can save results, track progress, and export the data.

It is built for people who want a super-fast, automated way to browse YC startups and evaluate job opportunities.

⭐ Key Features
🔍 1. YC Company Data Extraction

Scans YC company pages and extracts all relevant details.

🤖 2. AI-Generated Summary

Uses Gemini AI (geminiService.ts) to:

Summarize company purpose

Highlight relevant open roles

Suggest how you can contribute

📊 3. Job Stats Dashboard

Interactive job history and status indicators via:

JobStats.tsx

ProgressBar.tsx

WorkingBoard.tsx

🧩 4. Modular Component Architecture

Clean React components:

CompanyCard.tsx

CompanyDetail.tsx

SearchForm.tsx

DownloadModal.tsx

Sidebar.tsx

Header.tsx

Login.tsx

📥 5. Export & Save

Export data as CSV or text from the modal.

⚡ 6. Built with Vite + TypeScript

Ultra-fast development experience.

🏗️ Tech Stack
Category	Tech
Frontend	React, TypeScript
Build Tool	Vite
AI	Gemini API
Styling	CSS / Tailwind (if added)
Utilities	Custom hooks + Helpers
📂 Folder Structure
ash-job-scout/
│
├── components/
│   ├── Header.tsx
│   ├── SearchForm.tsx
│   ├── CompanyCard.tsx
│   ├── CompanyDetail.tsx
│   ├── ProgressBar.tsx
│   ├── JobStats.tsx
│   ├── WorkingBoard.tsx
│   ├── Sidebar.tsx
│   └── DownloadModal.tsx
│
├── services/
│   ├── geminiService.ts
│
├── utils.ts
├── types.ts
├── App.tsx
├── index.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.local
├── .gitignore
└── README.md

⚙️ Setup & Installation
1. Clone the repository
git clone https://github.com/<your-username>/ash-job-scout.git
cd ash-job-scout

2. Install dependencies
npm install

3. Add your Gemini API key

Inside .env.local:

VITE_GEMINI_API_KEY=your_key_here

4. Run the app
npm run dev


Your app will start at:

👉 http://localhost:5173/

📸 Screenshots (Add later)
/screenshots
  - dashboard.png
  - company_details.png
  - extraction_flow.gif

🚀 Future Enhancements

 Chrome Extension version

 Auto-apply workflow

 LinkedIn job integration

 Multi-source scraping (Wellfound, RemoteOK, YCW23 pages)

 Export to Google Sheets

📄 License

MIT License. Use freely.

🎤 Author

Ash
Full-stack Engineer & Automation Architect
(You can add your LinkedIn/GitHub link)
