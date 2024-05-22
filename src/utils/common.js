export const capitalizeFirstLetter = (string) => (
  string[0].toUpperCase() + string.slice(1)
);

export const getLastCharacterOfString = (string) => (
  string.trim().split(' ').slice(-1)
);

export const updateItem = (items, update) => (
  items.map((item) => item.id === update.id ? update : item)
);
