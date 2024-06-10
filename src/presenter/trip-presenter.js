import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {remove, render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';
import {SortingOption} from '../constants.js';
import {sortEventsByDate, sortEventsByDuration, sortEventsByPrice} from '../utils/point.js';

export default class TripPresenter {
  #tripInfoContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointListComponent = new PointListView();
  #emptyListComponent = new EmptyListView();
  #sortingComponent = null;

  #pointPresenters = new Map();
  #tripInfoPresenter = null;

  #currentSortingOption = null;

  constructor({tripInfoContainer, tripEventsContainer, pointsModel, destinationsModel, offersModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#currentSortingOption = SortingOption.DEFAULT;

    this.#tripInfoPresenter = new TripInfoPresenter({
      tripInfoContainer: this.#tripInfoContainer
    });
  }

  get points() {
    switch (this.#currentSortingOption) {
      case SortingOption.TIME:
        return [...this.#pointsModel.points].sort(sortEventsByDuration);
      case SortingOption.PRICE:
        return [...this.#pointsModel.points].sort(sortEventsByPrice);
      default:
        return [...this.#pointsModel.points].sort(sortEventsByDate);
    }
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init() {
    this.#renderTripInfo();
    this.#renderTrip();
  }

  #handleSortingOptionChange = (sortingOption) => {
    if (this.#currentSortingOption === sortingOption) {
      return;
    }

    this.#currentSortingOption = sortingOption;
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

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.destinations, this.offers);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id)
      .init(updatedPoint, this.destinations, this.offers);
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
    this.#renderSorting();

    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderPointList();
  }
}
