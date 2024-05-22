import {render, replace, remove} from '../framework/render';
import PointView from '../view/point-view';
import PointFormView from '../view/point-form-view';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditFormComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #handlePointChange = null;

  constructor({pointListContainer, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handlePointChange = onDataChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditFormComponent = this.#pointEditFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onArrowDownClick: this.#handleArrowDownClick,
      onFavoriteButtonClick: this.#handleFavoriteButtonClick
    });

    this.#pointEditFormComponent = new PointFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onArrowUpClick: this.#handleArrowUpClick,
      onEditFormSubmit: this.#handleEditFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditFormComponent.element)) {
      replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditFormComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm() {
    replace(this.#pointEditFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleArrowDownClick = () => {
    this.#replacePointToEditForm();
  };

  #handleArrowUpClick = () => {
    this.#replaceEditFormToPoint();
  };

  #handleEditFormSubmit = (point) => {
    this.#handlePointChange(point);
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteButtonClick = () => {
    this.#handlePointChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
