import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import {getDifference} from './common';

dayjs.extend(duration);
dayjs.extend(isBetween);

// mock
export const getRandomArrayElement = (items) => (
  items[Math.floor(Math.random() * items.length)]
);

export const getRandomInteger = (max) => (
  Math.floor(Math.random * max)
);

export const getRandomBoolean = () => Math.random() >= 0.5;

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomStartTimestamp = () => {
  const start = new Date(2024, 1);
  const end = new Date(2024, 9);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const HOURS_IN_DAY = 24;
const MINS_IN_HOUR = 60;
const SECONDS_IN_MIN = 60;

export const getRandomEndTimestamp = (start) => {
  const MAX_DURATION_IN_MINS = 7;

  const end = new Date(start.getTime() + (MAX_DURATION_IN_MINS * HOURS_IN_DAY * MINS_IN_HOUR * 1000));

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomArrayLength = (array) => Math.floor(Math.random() * array.length);

export const getRandomArrayElements = (array) => (
  [...new Set(Array.from({length: getRandomArrayLength(array) + 1},
    () => array[getRandomArrayLength(array)]))]
);


export const humanizeEventDate = (date, format) => date ? dayjs(date).format(format) : '';

export const getDuration = (start, end) => {
  const eventDuration = getDifference(start, end);
  let formattedDuration;

  if (eventDuration > HOURS_IN_DAY * MINS_IN_HOUR * SECONDS_IN_MIN * 1000) {
    formattedDuration = dayjs.duration(eventDuration, 'ms')
      .format('DD[d] HH[h] mm[m]');
  }

  if (eventDuration < HOURS_IN_DAY * MINS_IN_HOUR * SECONDS_IN_MIN * 1000) {
    formattedDuration = dayjs.duration(eventDuration, 'ms')
      .format('HH[h] mm[m]');
  }

  if (eventDuration < MINS_IN_HOUR * SECONDS_IN_MIN * 1000) {
    formattedDuration = dayjs.duration(eventDuration, 'ms')
      .format('mm[m]');
  }

  return formattedDuration;
};

// filter

export const isFutureEvent = (startTime) => (
  dayjs().isBefore(startTime, 'D')
);

export const isPresentEvent = (startTime, endTime) => (
  dayjs().isBetween(startTime, endTime, 'D', '[]')
);

export const isPastEvent = (endTime) => (
  dayjs().isAfter(endTime, 'D')
);

// sorting

export const sortEventsByDate = (eventA, eventB) => (
  dayjs(eventB.endTime).diff(dayjs(eventA.startTime))
);

export const sortEventsByDuration = (eventA, eventB) => (
  dayjs(eventB.endTime).diff(dayjs(eventB.startTime)) - dayjs(eventA.endTime).diff(dayjs(eventA.startTime))
);

export const sortEventsByPrice = (eventA, eventB) => (
  eventB.price - eventA.price
);
