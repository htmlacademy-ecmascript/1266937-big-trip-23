export const capitalizeFirstLetter = (value) => (
  value[0].toUpperCase() + value.slice(1)
);

export const getLastCharacter = (value) => (
  value.trim().split(' ').slice(-1)
);
