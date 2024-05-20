import {render, replace} from '../framework/render';
import PointView from '../view/point-view';
import PointFormView from '../view/point-form-view';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditFormComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];

  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointComponent = new PointView({
      point: this.#point,
      onArrowDownClick: this.#handleArrowDownClick,
    });

    this.#pointEditFormComponent = new PointFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onArrowUpClick: this.#handleArrowUpClick,
      onEditFormSubmit: this.#handleEditFormSubmit,
    });

    render(this.#pointComponent, this.#pointListContainer);
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

  #handleEditFormSubmit = () => {
    this.#replaceEditFormToPoint();
  };
}
