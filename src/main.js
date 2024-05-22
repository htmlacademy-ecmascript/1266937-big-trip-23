import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const pagePresenter = new PagePresenter({
  tripInfoContainer: tripMainElement,
  filterContainer: filterControlsElement,
  tripEventsContainer: tripEventsElement,
  pointsModel,
});

pagePresenter.init();
