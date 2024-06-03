import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {remove, render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortingOption} from '../constants.js';
import {sortEventsByDate, sortEventsByDuration, sortEventsByPrice} from '../utils/point.js';

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
  #tripInfoPresenter = null;

  #currentSortingOption = null;

  constructor({tripInfoContainer, tripEventsContainer, pointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#pointsModel = pointsModel;

    this.#currentSortingOption = SortingOption.DEFAULT;

    this.#tripInfoPresenter = new TripInfoPresenter({
      tripInfoContainer: this.#tripInfoContainer
    });
  }

  init() {
    this.#points = [...this.#pointsModel.points].sort(sortEventsByDate);
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderTripInfo();
    this.#renderTrip();
  }

  #sortPoints(sortingOption) {
    switch (sortingOption) {
      case SortingOption.TIME:
        this.#points.sort(sortEventsByDuration);
        break;
      case SortingOption.PRICE:
        this.#points.sort(sortEventsByPrice);
        break;
      default:
        this.#points.sort(sortEventsByDate);
    }

    this.#currentSortingOption = sortingOption;
  }

  #handleSortingOptionChange = (sortingOption) => {
    if (this.#currentSortingOption === sortingOption) {
      return;
    }

    this.#sortPoints(sortingOption);
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      currentSortingOption: this.#currentSortingOption,
      onSortingOptionChange: this.#handleSortingOptionChange,
    });

    render(this.#sortingComponent, this.#tripEventsContainer);
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

  #renderTripInfo() {
    this.#tripInfoPresenter.init();
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #clearTrip() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
  }


  #renderTrip() {
    // this.#renderTripInfo();
    this.#renderSorting();

    if (this.#points.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderPointList();
  }
}
