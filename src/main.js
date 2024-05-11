import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const presenter = new Presenter({
  tripInfoContainer: tripMainElement,
  filterContainer: filterControlsElement,
  sortingContainer: tripEventsElement,
  pointListContainer: tripEventsElement,
  pointsModel,
});

presenter.init();
