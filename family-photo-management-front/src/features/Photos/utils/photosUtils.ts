export const getRandomPhotoUrl = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://via.placeholder.com/200x300/${randomColor}`;
};
