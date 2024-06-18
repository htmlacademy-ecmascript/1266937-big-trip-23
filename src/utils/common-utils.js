export const capitalizeFirstLetter = (string) => (
  string[0].toUpperCase() + string.slice(1)
);

export const getLastCharacterOfString = (string) => (
  string.trim().split(' ').slice(-1)
);
