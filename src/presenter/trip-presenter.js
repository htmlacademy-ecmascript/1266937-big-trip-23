import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {remove, render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';
import {SortingOption, UserAction, UpdateType} from '../constants.js';
import {sortEventsByDate, sortEventsByDuration, sortEventsByPrice} from '../utils/point.js';
import {filterByOptions} from '../utils/filter-utils.js';

export default class TripPresenter {
  #tripInfoContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #pointListComponent = new PointListView();
  #emptyListComponent = new EmptyListView();
  #sortingComponent = null;

  #pointPresenters = new Map();
  #tripInfoPresenter = null;

  #currentSortingOption = SortingOption.DEFAULT;

  constructor({tripInfoContainer, tripEventsContainer, pointsModel, destinationsModel, offersModel, filterModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#tripInfoPresenter = new TripInfoPresenter({
      tripInfoContainer: this.#tripInfoContainer
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  get points() {
    const filterOption = this.#filterModel.filter;
    const points = this.#pointsModel.points.sort(sortEventsByDate);
    const filteredPoints = filterByOptions[filterOption](points);

    switch (this.#currentSortingOption) {
      case SortingOption.TIME:
        return filteredPoints.sort(sortEventsByDuration);
      case SortingOption.PRICE:
        return filteredPoints.sort(sortEventsByPrice);
      default:
        return filteredPoints.sort(sortEventsByDate);
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
    // TODO
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

  // TODO
  #renderPointList() {
    render(this.#pointListComponent, this.#tripEventsContainer);

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.destinations, this.offers);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить весь маршрут
        this.#clearTrip({resetSortingOption: true});
        this.#renderTrip();
        break;
    }
  };

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
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

  #clearTrip({resetSortingOption = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#emptyListComponent);

    if (resetSortingOption) {
      this.#currentSortingOption = SortingOption.DEFAULT;
    }
  }

  #renderTrip() {
    const points = this.points;
    if (points.length > 0) {
      this.#renderSorting();
    }

    if (points.length === 0) {
      this.#renderEmptyList();
      remove(this.#pointListComponent);
      return;
    }

    this.#renderPointList();
  }
}
