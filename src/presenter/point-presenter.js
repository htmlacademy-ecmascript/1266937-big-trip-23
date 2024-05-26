import {render, replace, remove} from '../framework/render';
import PointView from '../view/point-view';
import PointFormView from '../view/point-form-view';
import {Mode} from '../constants';

export default class PointPresenter {
  #pointListContainer = null;
  #handlePointChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditFormComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
