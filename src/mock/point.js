import {getRandomArrayElement, getRandomStartTimestamp, getRandomEndTimestamp, getRandomBoolean} from '../utils';

const pointTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const destinationCities = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Oslo',
  'Copenhagen',
  'Prague',
  'Athens',
  'Stockholm',
  'Lisbon',
  'Riga',
];

export const generateMockPoint = () => {
  const startTime = getRandomStartTimestamp();

  return {
    startTime: startTime,
    type: getRandomArrayElement(pointTypes),
    endTime: (getRandomEndTimestamp(startTime)),
    destination: getRandomArrayElement(destinationCities),
    isFavorite: getRandomBoolean(),
    price: 20,
  };
};
