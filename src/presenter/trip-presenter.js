import TripInfoView from '../view/trip-info-view.js';
import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortingOption} from '../constants.js';

export default class TripPresenter {
  #tripInfoContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #emptyListComponent = new EmptyListView();
  #sortingComponent = null;

  #points = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();

  #currentSortingOption = null;

  constructor({tripInfoContainer, tripEventsContainer, pointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#pointsModel = pointsModel;

    this.#currentSortingOption = SortingOption.DAY;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderTrip();
  }

  #handleSortingOptionChange(sortingOption) {
    // sort events
    // clear list
    // render new list
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView(
      {onSortingOptionChange: this.#handleSortingOptionChange}
    );

    render(this.#sortingComponent, this.#tripEventsContainer);
  }

  #renderTripInfo() {
    render(new TripInfoView(), this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointList() {
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

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #renderTrip() {
    this.#renderTripInfo();
    this.#renderSorting();

    if (this.#points.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderPointList();
  }
}
