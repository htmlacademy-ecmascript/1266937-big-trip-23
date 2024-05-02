import {render} from './render.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';

const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), filterControlsElement);
render(new SortingView(), tripEventsElement);
