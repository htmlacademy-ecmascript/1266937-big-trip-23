import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadView from '../view/failed-load-view.js';
import {remove, render} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SortingOption, UserAction, UpdateType, FilterOption, TimeLimit} from '../constants.js';
import {sortEventsByDate, sortEventsByDuration, sortEventsByPrice} from '../utils/point-utils.js';
import {filterByOptions} from '../utils/filter-utils.js';


export default class TripPresenter {
  #tripPointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #sortingComponent = null;
  #emptyListComponent = null;
  #failedLoadComponent = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #currentSortingOption = SortingOption.DEFAULT;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({
    tripPointsContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
    onNewPointDestroy}) {
    this.#tripPointsContainer = tripPointsContainer;

    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterOption = this.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterByOptions[filterOption](points);

    switch (this.#currentSortingOption) {
      case SortingOption.DEFAULT:
        return filteredPoints.sort(sortEventsByDate);
      case SortingOption.TIME:
        return filteredPoints.sort(sortEventsByDuration);
      case SortingOption.PRICE:
        return filteredPoints.sort(sortEventsByPrice);
    }

    return filteredPoints;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get filter() {
    return this.#filterModel.filter;
  }

  get failedLoad() {
    return this.#pointsModel.isFailedLoad;
  }

  init() {
    this.#renderTrip();
  }

  createNewPoint() {
    this.#currentSortingOption = SortingOption.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterOption.DEFAULT);
    this.#newPointPresenter.init(this.destinations, this.offers);
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

    render(this.#sortingComponent, this.#tripPointsContainer);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortingOption: true});
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

  #renderPointList(points, destinations, offers) {
    render(this.#pointListComponent, this.#tripPointsContainer);

    points.forEach((point) => this.#renderPoint(point, destinations, offers));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripPointsContainer);
  }

  #renderFailedLoad() {
    this.#failedLoadComponent = new FailedLoadView({
      isFailedLoad: this.failedLoad,
    });

    render(this.#failedLoadComponent, this.#tripPointsContainer);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyListView({
      filterOption: this.filter
    });

    render(this.#emptyListComponent, this.#tripPointsContainer);
  }

  #clearTrip({resetSortingOption = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#emptyListComponent);
    remove(this.#failedLoadComponent);

    if (resetSortingOption) {
      this.#currentSortingOption = SortingOption.DEFAULT;
    }

    remove(this.#loadingComponent);
  }

  #renderTrip() {
    const points = this.points;
    const pointCount = points.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.failedLoad) {
      this.#renderFailedLoad();
      return;
    }

    if (pointCount === 0) {
      this.#renderEmptyList();
      return;
    }

    if (pointCount > 0) {
      this.#renderSorting();
    }

    this.#renderPointList(points, this.destinations, this.offers);
  }
}
