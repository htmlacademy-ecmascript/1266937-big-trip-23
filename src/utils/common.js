export const capitalizeFirstLetter = (string) => (
  string[0].toUpperCase() + string.slice(1)
);

export const getLastCharacterOfString = (string) => (
  string.trim().split(' ').slice(-1)
);

export const updateItem = (items, updatedItem) => (
  items.map((item) => item.id === updatedItem.id ? updatedItem : item)
);
