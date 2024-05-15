import {getRandomIntInclusive} from '../utils';

export const offers = [
  {
    type: 'taxi',
    offers: {
      id: crypto.randomUUID(),
      title: 'Order Über',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'sightseeing',
    offers: {
      id: crypto.randomUUID(),
      title: 'Lunch in city',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'sightseeing',
    offers: {
      id: crypto.randomUUID(),
      title: 'Book tickets',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'check-in',
    offers: {
      id: crypto.randomUUID(),
      title: 'Add breakfast',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'taxi',
    offers: {
      id: crypto.randomUUID(),
      title: 'Upgrade to a business class',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'flight',
    offers: {
      id: crypto.randomUUID(),
      title: 'Choose seats',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'flight',
    offers: {
      id: crypto.randomUUID(),
      title: 'Add meal',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'flight',
    offers: {
      id: crypto.randomUUID(),
      title: 'Switch to comfort class',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'flight',
    offers: {
      id: crypto.randomUUID(),
      title: 'Add luggage',
      price: getRandomIntInclusive(5, 250),
    }
  },
  {
    type: 'drive',
    offers: {
      id: crypto.randomUUID(),
      title: 'Rent a car',
      price: getRandomIntInclusive(5, 250),
    }
  },
];
