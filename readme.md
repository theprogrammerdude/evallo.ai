# Log Ingestion & Query System

A lightweight log ingestion, filtering, and real-time viewing tool built with **Node.js** (backend) and **React** (frontend).  
The backend stores logs in a local JSON file, supports advanced filtering, and streams updates to the frontend via **WebSockets**.  
The frontend offers a clean UI with search, filtering, and charts.

---

## Features
- 📜 **View Logs** in reverse chronological order.
- 🔍 **Full-text Search** on log messages (case-insensitive).
- ⚠ **Level Filtering** (`error`, `warning`, `info`) with color-coded entries.
- ⏳ **Date Range Filtering** to view logs for a specific time frame.
- 🖥 **Resource ID Filtering** for specific services or instances.
- 🧮 **Combine Multiple Filters** at once.
- 📊 **Dashboard Chart** for log counts by level.
- 🔄 **Real-time Updates** using WebSockets.
- 🐳 **Dockerized** for easy deployment.

---

## Tech Stack
- **Backend:** Node.js, Express, Socket.IO
- **Frontend:** React, Tailwind CSS, Chart.js (or Recharts)
- **Data Storage:** JSON file (`logs.json`)
- **Deployment:** Docker & Docker Compose

## Made By  
👨‍💻 **Shashank Jaitly**  
📞 **Phone:** +91 9599784204  
📧 **Email:** [shashank.jaitly.98@gmail.com](mailto:shashank.jaitly.98@gmail.com)  
🌐 **Website:** [https://developedbydude.web.app/](https://developedbydude.web.app/)
