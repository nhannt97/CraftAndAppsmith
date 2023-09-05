export const capitalize = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const weightDescription = (weight: number) => {
  switch (weight) {
    case 400:
      return "Regular";
    case 500:
      return "Medium";
    case 700:
      return "Bold";
    default:
      return "Unknown";
  }
};
