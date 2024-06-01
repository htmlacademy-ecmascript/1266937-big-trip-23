import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import {filterByOptions} from './utils/filter-utils.js';


const tripMainElement = document.querySelector('.trip-main');
const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter({
  tripInfoContainer: tripMainElement,
  tripEventsContainer: tripEventsElement,
  pointsModel,
});

const filters = Object.keys(filterByOptions);

render(new FilterView({filters}), filterControlsElement);

tripPresenter.init();
