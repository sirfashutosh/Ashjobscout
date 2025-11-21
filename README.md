<div align="center">
  
# 🚀 **Ash Job Scout**
### *AI-Powered YC Job Intelligence App*

A smart dashboard that scans Y Combinator startups, extracts founders & open roles, and helps you apply faster and smarter.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-Bundler-purple)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange)

<br/>

<img width="650" src="https://via.placeholder.com/1200x350.png?text=Ash+Job+Scout+Banner+(Replace+with+Screenshot)" />

</div>

---

## 📌 **Overview**

**Ash Job Scout** is a personal YC startup explorer designed to make your job search smarter.  
Paste any YC company link → the app extracts all the important details for you:

- ✅ Company Name  
- ✅ Industry  
- ✅ Website  
- ⚡ Founder Name(s)  
- ⚡ Open Job Positions  

AI (Gemini) then generates summaries, insights, and recruiter-ready notes automatically.

---

## ✨ **Features**

### 🔍 **1. YC Data Extraction**
Auto-scrapes company details from YC.

### 🤖 **2. Gemini AI Summary**
Explains the company, products, founders & best matching roles.

### 📊 **3. Dashboard & Progress Tracking**
Track explored companies, your interest level, and job suitability.

### 📥 **4. Export Options**
Download company insights as text, JSON, or CSV.

### 🧩 **5. Modular UI**
Built with clean React components for easy customization.

---

## 🧱 **Tech Stack**

| Category | Technology |
|---------|-------------|
| Frontend | React (TypeScript) |
| AI | Gemini API |
| Build Tool | Vite |
| State/Data | Custom Utilities |
| UI | CSS + React Components |

---

## 📂 **Project Structure**

ash-job-scout/
│
├── components/
│ ├── Header.tsx
│ ├── SearchForm.tsx
│ ├── CompanyCard.tsx
│ ├── CompanyDetail.tsx
│ ├── ProgressBar.tsx
│ ├── JobStats.tsx
│ ├── WorkingBoard.tsx
│ └── DownloadModal.tsx
│
├── services/
│ └── geminiService.ts
│
├── utils.ts
├── types.ts
├── App.tsx
├── index.tsx
├── index.html
├── package.json
└── vite.config.ts

yaml
Copy code

---

## 🛠️ **Getting Started**

### **1. Install Dependencies**
```bash
npm install
2. Add Your Gemini API Key
Create .env.local:

ini
Copy code
VITE_GEMINI_API_KEY=your_key_here
3. Run the App
bash
Copy code
npm run dev
The app will be available at:
👉 http://localhost:5173/

📸 Screenshots
(Replace these with real screenshots later — GitHub supports drag-and-drop)

Dashboard	Company Detail

🚀 Future Enhancements
 Chrome Extension version

 Auto-apply workflow

 LinkedIn integration

 Multi-platform scraping (Wellfound, RemoteOK)

 AI recommendation engine

 ## 📸 App Screenshots

Ash Job Scout is a clean and modern AI-powered job scouting platform designed to scan YC & LinkedIn roles and help users find highly relevant opportunities.

---

### 🟣 **Home / Search Page**
The main AI role search interface with Y Combinator + LinkedIn toggle and gradient search bar.

![Home Search](/assets/screenshots/ash-job-scout-1.png)

---

### 🟦 **Market Intelligence Overview**
Displays distribution of engineering roles vs. other categories based on the scanned result set.

![Market Overview](/assets/screenshots/ash-job-scout-2.png)

---

### 🟧 **Company Insights – Listing View**
Shows all scanned companies, enrichment tags, relevance, and extracted job roles.

![Company List](/assets/screenshots/ash-job-scout-3.png)

---

### 🟩 **Company Details – Expanded Role Breakdown**
When a company is expanded, detailed job roles, salaries, and tags are displayed.

![Company Expand](/assets/screenshots/ash-job-scout-4.png)

---

### 🟡 **Working Board**
A focused workspace where opportunities are processed one at a time.

![Working Board](/assets/screenshots/ash-job-scout-5.png)

---

### 🟠 **Company Profile View**
A deeper dive including website, batch, company size, headquarters, tags, and active roles.

![Company Profile](/assets/screenshots/ash-job-scout-6.png)

---

### 🔵 **LinkedIn Job Scout Mode**
Allows scanning LinkedIn roles with the same AI-powered workflow.

![LinkedIn Mode](/assets/screenshots/ash-job-scout-7.png)

---



👨‍💻 Author
Ash (No-code Expert level developer building automated intelligence tools)
