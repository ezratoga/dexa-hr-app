export const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    weekday: "long",   // Senin, Selasa, ...
    day: "numeric",    // 15
    month: "long",     // September
    year: "numeric",   // 2025
    hour: "2-digit",   // 08
    minute: "2-digit", // 59
    hour12: false
  });
};