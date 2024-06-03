import {render, RenderPosition} from '../framework/render';
import TripInfoView from '../view/trip-info-view';

export default class TripInfoPresenter {
  #tripInfoContainer = null;

  constructor({tripInfoContainer}) {
    this.#tripInfoContainer = tripInfoContainer;
  }

  init() {
    this.#renderTripInfo();
  }

  #renderTripInfo() {
    render(new TripInfoView(), this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }
}

