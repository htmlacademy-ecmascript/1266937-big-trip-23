import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import newPointButtonView from './view/new-point-button-view.js';
import {render} from './framework/render.js';


const tripMainElement = document.querySelector('.trip-main');
const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripInfoContainer: tripMainElement,
  tripPointsContainer: tripEventsElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterControlsElement,
  filterModel,
});

const newPointButtonComponent = new newPointButtonView({
  // handler
});

render(newPointButtonComponent, tripMainElement);

filterPresenter.init();
tripPresenter.init();
