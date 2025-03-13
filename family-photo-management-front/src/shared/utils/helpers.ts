export const interpolateWithValues = (strMakeChanges: string, ...values: string[]) => {
  values.forEach(value => {
    const matches = strMakeChanges.match(/{[A-Za-z]+}/g);
    if (matches) {
      strMakeChanges = strMakeChanges.replace(matches[0], value);
    }
  });
  return strMakeChanges;
};

export const generateUniqueRandomNumber = (existingNumbers: number[], min: number, max: number): number => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (existingNumbers.includes(randomNumber));
  return randomNumber;
};
