import {RenderPosition, render} from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import PointListView from './view/point-list-view.js';
import PointView from './view/point-view.js';

const tripMainElement = document.querySelector('.trip-main');
const filterControlsElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterControlsElement);
render(new SortingView(), tripEventsElement);

const renderPointList = (pointListContainer) => {
  const pointListComponent = new PointListView();

  render(pointListComponent, pointListContainer);
  render(new PointView(), pointListComponent.getElement());
};

renderPointList(tripEventsElement);
