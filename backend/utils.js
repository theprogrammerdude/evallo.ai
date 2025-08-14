import path from "path";
import fs from "fs";

const logsPath = path.join(process.cwd(), "logs.json");

export const readLogs = () => {
  const data = fs.readFileSync(logsPath, "utf-8");
  return JSON.parse(data);
};

export const writeLogs = (logs) =>
  fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
