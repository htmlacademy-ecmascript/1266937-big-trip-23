import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch (err) {
      this.#destinations = [];
    }
  }

  #adaptToClient(destinations) {
    const adaptedDestinations = {
      ...destinations,
      city: destinations['name'],
    };

    delete adaptedDestinations['name'];

    return adaptedDestinations;
  }
}
