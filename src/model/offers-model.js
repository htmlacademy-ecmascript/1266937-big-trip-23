import Observable from '../framework/observable';
import {offers} from '../mock/offers';


export default class OffersModel extends Observable {
  #offers = offers;

  get offers() {
    return this.#offers;
  }
}
