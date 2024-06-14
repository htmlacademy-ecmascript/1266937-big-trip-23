export const TimeFormatDisplay = {
  DATE_FORMAT: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  DATE_TIME_FORMAT: 'DD/MM/YY hh:mm',
};

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
};

export const NEW_POINT = {
  type: 'flight',
  offers: [],
  destination: '',
  startTime: null,
  endTime: null,
  price: 0,
  isFavorite: false,
};
