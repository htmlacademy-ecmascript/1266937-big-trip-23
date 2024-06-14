import Observable from '../framework/observable';


export default class OffersModel extends Observable {
  #pointsApiService = null;
  #offers = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get offers() {
    return this.#offers;
  }
}
