import {render} from './render';
import FilterView from './view/filter-view';

const filterControlsElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), filterControlsElement);
