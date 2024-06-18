import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import {TimeFormatDisplay} from '../constants';

dayjs.extend(duration);
dayjs.extend(isBetween);

export const humanizeEventDate = (date, format) => date ? dayjs(date).format(format) : '';

export const getEventDuration = (startTime, endTime) => {
  const HOURS_IN_DAY = 24;
  const MINUTES_IN_HOUR = 60;
  const SECONDS_IN_MINUTE = 60;

  const durationInMs = dayjs(endTime).diff(dayjs(startTime));

  const hours = dayjs.duration(durationInMs).hours();
  const minutes = dayjs.duration(durationInMs).minutes();
  const days = Math.trunc(durationInMs / HOURS_IN_DAY / MINUTES_IN_HOUR / SECONDS_IN_MINUTE / 1000);

  let formattedDuration;

  if (!days && !hours) {
    formattedDuration = dayjs(durationInMs).format(TimeFormatDisplay.DURATION_MINUTES);
  } else if (hours && !days) {
    formattedDuration = dayjs(durationInMs).format(TimeFormatDisplay.DURATION_HOURS);
  } else {
    formattedDuration =
      `${days.toString().padStart(2, 0)}D 
      ${hours.toString().padStart(2, 0)}H 
      ${minutes.toString().padStart(2, 0)}M`;
  }

  return formattedDuration;
};

export const isFutureEvent = (startTime) => (
  dayjs().isBefore(startTime, 'D')
);

export const isPresentEvent = (startTime, endTime) => (
  dayjs().isBetween(startTime, endTime, 'D', '[]')
);

export const isPastEvent = (endTime) => (
  dayjs().isAfter(endTime, 'D')
);

export const sortEventsByDate = (eventA, eventB) => (
  dayjs(eventA.startTime).diff(dayjs(eventB.startTime))
);

export const sortEventsByDuration = (eventA, eventB) => (
  dayjs(eventB.endTime).diff(dayjs(eventB.startTime)) - dayjs(eventA.endTime).diff(dayjs(eventA.startTime))
);

export const sortEventsByPrice = (eventA, eventB) => (
  eventB.price - eventA.price
);
