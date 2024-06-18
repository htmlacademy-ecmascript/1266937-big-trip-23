export const AUTHORIZATION = 'Basic jT8fld32ld7qR31h';
export const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

export const POINT_TYPES = [
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

const DEFAULT_POINT_TYPE = 'flight';

export const NEW_POINT = {
  type: DEFAULT_POINT_TYPE,
  offers: [],
  destination: '',
  startTime: '',
  endTime: '',
  price: 0,
  isFavorite: false,
};

export const TimeFormatDisplay = {
  DATE: 'MMM DD',
  TIME: 'HH:mm',
  DATE_TIME: 'DD/MM/YY hh:mm',
  FLATPICKR_DATE_TIME: 'd/m/y H:i',
  DURATION_HOURS: 'HH[h] mm[m]',
  DURATION_MINUTES: 'mm[m]',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const FilterOption = {
  DEFAULT: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortingOption = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const EmptyListMessageOption = {
  [FilterOption.DEFAULT]: 'Click New Event to create your first point',
  [FilterOption.FUTURE]: 'There are no future events now',
  [FilterOption.PRESENT]: 'There are no present events now',
  [FilterOption.PAST]: 'There are no past events now',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
