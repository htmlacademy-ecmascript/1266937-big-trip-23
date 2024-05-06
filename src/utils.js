// mock
export const getRandomArrayElement = (items) => (
  items[Math.floor(Math.random() * items.length)]
);

export const getRandomInteger = (max) => (
  Math.floor(Math.random * max)
);

export const getRandomBoolean = () => Math.random() >= 0.5;

export const getRandomStartTimestamp = () => {
  const start = new Date();
  const end = new Date(2024, 9);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); // elapsed time in milliseconds
};

export const getRandomEndTimestamp = (start) => {
  const end = new Date(start.getTime() + (5 * 24 * 60 * 1000));

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
