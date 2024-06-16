import PointFormView from '../view/point-form-view';
import {render, RenderPosition} from '../framework/render';
import {UserAction, UpdateType} from '../constants';
import {remove} from '../framework/render';


export default class NewPointPresenter {
  #pointListContainer = null;
  #pointFormComponent = null;

  #destinations = [];
  #offers = [];

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({pointListContainer, destinations, offers, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    this.#destinations = destinations;
    this.#offers = offers;
    if (this.#pointFormComponent !== null) {
      return;
    }

    this.#pointFormComponent = new PointFormView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteButtonClick: this.#handleDeleteButtonClick,
    });

    render(this.#pointFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointFormComponent);
    this.#pointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteButtonClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
