import Observable from '../framework/observable';


export default class OffersModel extends Observable {
  #pointsApiService = null;
  #offers = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    const offers = await this.#pointsApiService.offers;
    this.#offers = offers;
  }
}
