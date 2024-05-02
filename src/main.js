import {RenderPosition, render} from './render.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import TripInfoView from './view/trip-info-view.js';

const tripInfoElement = document.querySelector('.trip-main');
const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterControlsElement);
render(new SortingView(), tripEventsElement);
