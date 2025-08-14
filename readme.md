# Log Ingestion & Query System

A lightweight log ingestion, filtering, and real-time viewing tool built with **Node.js** (backend) and **React** (frontend).  
The backend stores logs in a local JSON file, supports advanced filtering, and streams updates to the frontend via **WebSockets**.  
The frontend offers a clean UI with search, filtering, and charts.

---

### 🔍 Log Query & Filtering
- View logs in reverse-chronological order (most recent first).
- Case-insensitive full-text search on the `message` field.
- Filter logs by:
  - **Level** (`error`, `info`, `warning`)
  - **Resource ID**
  - **Timestamp range** (start & end date/time)
- Combine multiple filters for highly specific searches.
- Dynamic updates when filters are changed.

### ⚡ Real-time WebSocket Updates
- Uses **Socket.IO** to push new logs from the backend to the frontend instantly.
- Clients receive new logs without needing to refresh or manually fetch data.
- Supports **real-time filtered queries**:
  - Example: The frontend sends `{ search: "database", levels: ["error"], startDate: "2025-08-10T00:00:00Z" }`
  - The backend processes filters on the server and streams only matching logs back.

### 📊 Dashboard Visualization
- A modal-based dashboard displays a **chart** of logs grouped by level.
- Uses **Recharts** to show log counts for each level (`error`, `warning`, `info`).
- Colors are dynamically assigned:
  - **Error** → Red
  - **Warning** → Yellow
  - **Info** → Blue
- Chart automatically respects the **currently applied filters**.

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

