export const getRandomPhotoUrl = (): string => {
  return `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100) + 1}`;
};
