import {
  getRandomArrayElement,
  getRandomStartTimestamp,
  getRandomEndTimestamp,
  getRandomBoolean,
  getRandomIntInclusive,
  getRandomArrayElements,
} from '../utils';
import {offers} from './offers';

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
  const type = getRandomArrayElement(pointTypes);
  const activeOffers = offers.filter((offer) => offer.type === type);

  return {
    id: crypto.randomUUID(),
    startTime: startTime.toISOString(),
    type: type,
    endTime: (getRandomEndTimestamp(startTime)).toISOString(),
    destination: getRandomArrayElement(destinationCities),
    isFavorite: getRandomBoolean(),
    price: getRandomIntInclusive(50, 1300),
    offers: getRandomArrayElements(activeOffers),
  };
};
