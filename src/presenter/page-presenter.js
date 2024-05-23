import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class PagePresenter {
  #tripInfoContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();

  #points = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();

  constructor({tripInfoContainer, filterContainer, tripEventsContainer, pointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(new TripInfoView(), this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#filterContainer);
    render(new SortingView(), this.#tripEventsContainer);

    render(this.#pointListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id)
      .init(updatedPoint, this.#destinations, this.#offers);
  };

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
