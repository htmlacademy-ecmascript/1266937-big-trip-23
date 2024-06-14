import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.destinations.then((destinations) => {
      console.log(destinations)
    });
  }

  get destinations() {
    return this.#destinations;
  }
}
