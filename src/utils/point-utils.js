import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import {getDifference} from './common-utils';

dayjs.extend(duration);
dayjs.extend(isBetween);

const HOURS_IN_DAY = 24;
const MINS_IN_HOUR = 60;
const SECONDS_IN_MIN = 60;

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
