export const formatDate = (date: string): string => {
  const d = new Date(date);
  const formatted = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return formatted;
};
