import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view.js';
import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import PointFormView from '../view/point-form-view.js';
import PointView from '../view/point-view.js';
import {render, RenderPosition, replace} from '../framework/render.js';

export default class Presenter {
  #tripInfoContainer = null;
  #filterContainer = null;
  #sortingContainer = null;
  #pointListContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();

  #points = [];
  #destinations = [];
  #offers = [];

  constructor({tripInfoContainer, filterContainer, sortingContainer, pointListContainer, pointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#filterContainer = filterContainer;
    this.#sortingContainer = sortingContainer;
    this.#pointListContainer = pointListContainer;

    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(new TripInfoView(), this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#filterContainer);
    render(new SortingView(), this.#sortingContainer);

    render(this.#pointListComponent, this.#pointListContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#destinations, this.#offers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const pointComponent = new PointView({
      point,
      onArrowDownClick: () => (replacePointToEditForm())
    });

    const pointEditFormComponent = new PointFormView({
      point,
      destinations,
      offers,
      onArrowUpClick: () => (replaceEditFormToPoint()),
      onEditFormSubmit: () => (replaceEditFormToPoint())
    });

    function replacePointToEditForm() {
      replace(pointEditFormComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, pointEditFormComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }
}
