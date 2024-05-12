import {
  getRandomArrayElement,
  getRandomStartTimestamp,
  getRandomEndTimestamp,
  getRandomBoolean,
  getRandomIntInclusive,
  getRandomArrayElements,
} from '../utils';
import {offers} from './offers';
import {generateMockDestination} from './destinations';
import {POINT_TYPES} from '../constants';

export const generateMockPoint = () => {
  const startTime = getRandomStartTimestamp();
  const type = getRandomArrayElement(POINT_TYPES);
  const activeOffers = offers.filter((offer) => offer.type === type);
  const destination = generateMockDestination();

  return {
    id: crypto.randomUUID(),
    startTime: startTime.toISOString(),
    type: type,
    endTime: (getRandomEndTimestamp(startTime)).toISOString(),
    isFavorite: getRandomBoolean(),
    price: getRandomIntInclusive(50, 1300),
    offers: getRandomArrayElements(activeOffers),
    destination: destination,
  };
};
