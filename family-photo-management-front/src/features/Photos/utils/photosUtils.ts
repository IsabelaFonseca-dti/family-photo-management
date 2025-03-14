export const getRandomPhotoUrl = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `https://via.placeholder.com/600/${randomColor}`;
};
