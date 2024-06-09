import {render, replace, remove} from '../framework/render';
import PointView from '../view/point-view';
import PointFormView from '../view/point-form-view';
import {Mode} from '../constants';

export default class PointPresenter {
  #pointListContainer = null;
  #handlePointChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointFormComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, offers, destinations, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointFormComponent = this.#pointFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onArrowDownClick: this.#handleArrowDownClick,
      onFavoriteButtonClick: this.#handleFavoriteButtonClick
    });

    this.#pointFormComponent = new PointFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onArrowUpClick: this.#handleArrowUpClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleArrowDownClick = () => {
    this.#replacePointToForm();
  };

  #handleArrowUpClick = () => {
    this.#pointFormComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#handlePointChange(point);
    this.#replaceFormToPoint();
  };

  #handleFavoriteButtonClick = () => {
    this.#handlePointChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
