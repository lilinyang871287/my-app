export const generateOrganicShape = (): string => {
  // Generate a random organic border-radius blob
  const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
  return `${r(30, 70)}% ${r(30, 70)}% ${r(30, 70)}% ${r(30, 70)}% / ${r(30, 70)}% ${r(30, 70)}% ${r(30, 70)}% ${r(30, 70)}%`;
};