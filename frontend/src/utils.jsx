export const getQuery = (filters) => {
  const query = new URLSearchParams();

  if (filters.search) query.append("search", filters.search);
  if (filters.levels.length) query.append("levels", filters.levels.join(","));
  if (filters.resourceId) query.append("resourceId", filters.resourceId);
  if (filters.startDate)
    query.append("start", new Date(filters.startDate).toISOString());
  if (filters.endDate)
    query.append("end", new Date(filters.endDate).toISOString());

  return query;
};
