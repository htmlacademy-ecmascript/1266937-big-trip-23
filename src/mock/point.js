import {
  getRandomArrayElement,
  getRandomStartTimestamp,
  getRandomEndTimestamp,
  getRandomBoolean,
  getRandomIntInclusive,
  getRandomArrayElements,
} from '../utils/point';
import {offers} from './offers';
import {destinations} from './destinations';
import {POINT_TYPES} from '../constants';

export const generateMockPoint = () => {
  const startTime = getRandomStartTimestamp();
  const type = getRandomArrayElement(POINT_TYPES);
  const offersByType = offers.filter((offer) => offer.type === type);
  const offersId = offersByType.map(({offers: {id}}) => id);

  return {
    id: crypto.randomUUID(),
    startTime: startTime.toISOString(),
    type: type,
    endTime: (getRandomEndTimestamp(startTime)).toISOString(),
    isFavorite: getRandomBoolean(),
    price: getRandomIntInclusive(50, 1300),
    offers: getRandomArrayElements(offersId),
    destination: getRandomArrayElement(destinations).id,
  };
};
