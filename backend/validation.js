export const validateLog = (log) => {
  const requiredFields = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ];

  for (const field of requiredFields) {
    if (!(field in log)) return `${field} is missing`;
  }

  const validLevels = ["error", "warn", "info", "debug"];
  if (!validLevels.includes(log.level)) {
    return `Invalid level: ${log.level}`;
  }

  if (isNaN(Date.parse(log.timestamp))) {
    return `Invalid timestamp: ${log.timestamp}`;
  }

  if (typeof log.metadata !== "object" || Array.isArray(log.metadata)) {
    return "metadata must be a JSON object";
  }

  return null;
};
