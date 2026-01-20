# 🧬 Biotech Sales Leads Dashboard

A robust, full-stack dashboard designed for tracking sales leads in the biotechnology sector. This application serves as a centralized hub for monitoring pipeline value, active negotiations, and revenue distribution across therapeutic areas (e.g., Oncology, Genomics).

🔗 **Live Demo:** "https://biotech-dashboard-dun.vercel.app/"

---

## 🚀 Features

- **Real-Time Data:** Fetches live sales data from a **Supabase (PostgreSQL)** database.
- **Dynamic Visualization:** Interactive charts visualizing revenue distribution by sector using **Recharts**.
- **KPI Tracking:** Aggregated metrics for Total Pipeline Value, Active Leads, and Conversion Rates.
- **Biotech Context:** Specialized data fields for Therapeutic Areas and Clinical Stages.
- **Responsive Design:** Fully responsive UI built with **Tailwind CSS**, optimized for desktop and mobile.
- **Modern UI:** Glassmorphism aesthetic with premium interactions and dark mode elements.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | Next.js (React), Tailwind CSS |
| Backend / Database | Supabase (PostgreSQL) |
| Visualization | Recharts |
| Icons | Lucide React |
| Deployment | Vercel |

---

## ⚙️ Installation & Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/biotech-dashboard.git
cd biotech-dashboard

# Install dependencies
npm install

# Create environment variables
touch .env.local

# Add Supabase credentials to .env.local
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run the development server
npm run dev
