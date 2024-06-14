import {FilterOption} from '../constants';
import {isFutureEvent, isPresentEvent, isPastEvent} from './point';

export const filterByOptions = {
  [FilterOption.DEFAULT]: (points) => [...points],
  [FilterOption.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.startTime)),
  [FilterOption.PRESENT]: (points) => points.filter((point) => isPresentEvent(point.startTime, point.endTime)),
  [FilterOption.PAST]: (points) => points.filter((point) => isPastEvent(point.endTime))
};
