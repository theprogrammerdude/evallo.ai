import express from "express";
import cors from "cors";
import { readLogs, writeLogs } from "./utils.js";
import { Server } from "socket.io";
import http from "http";
import { validateLog } from "./validation.js";

const app = express();
const PORT = process.env.PORT || 3500;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  methods: ["GET", "POST"],
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  const logs = readLogs();
  const recent = logs.slice(-10);

  socket.emit("logs:recent", recent);

  socket.on(
    "logs:query",
    ({
      search = "",
      levels = [],
      resourceId = "",
      startDate = "",
      endDate = "",
    } = {}) => {
      let logs = readLogs();

      if (search) {
        logs = logs.filter((log) =>
          log.message.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (levels.length > 0) {
        logs = logs.filter((log) => levels.includes(log.level));
      }

      if (resourceId) {
        logs = logs.filter((log) =>
          log.resourceId.toLowerCase().includes(resourceId.toLowerCase())
        );
      }

      if (startDate) {
        logs = logs.filter(
          (log) => new Date(log.timestamp) >= new Date(startDate)
        );
      }

      if (endDate) {
        logs = logs.filter(
          (log) => new Date(log.timestamp) <= new Date(endDate)
        );
      }

      socket.emit("logs:res", logs);
    }
  );
});

app.post("/logs", (req, res) => {
  const error = validateLog(req.body);
  if (error) return res.status(400).json({ error });

  const logs = readLogs();

  logs.push(req.body);
  writeLogs(logs);

  io.emit("logs:new", { log: res.body });
  return res.status(201).json({ log: req.body });
});

app.get("/logs", (req, res) => {
  const { search, levels, resourceId, start, end } = req.query;

  try {
    var logs = readLogs();

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (search)
      logs = logs.filter((log) =>
        log.message.toLowerCase().includes(search.toLowerCase())
      );

    if (levels) logs = logs.filter((log) => levels.includes(log.level));

    if (start)
      logs = logs.filter((log) => new Date(log.timestamp) >= new Date(start));

    if (end)
      logs = logs.filter((log) => new Date(log.timestamp) <= new Date(end));

    if (resourceId)
      logs = logs.filter((log) =>
        log.resourceId.toLowerCase().includes(resourceId.toLowerCase())
      );

    return res.status(200).json({ logs });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
