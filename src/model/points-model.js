import {generateMockDestination} from '../mock/destinations';
import {generateMockPoint} from '../mock/point';
import {offers} from '../mock/offers';

const POINT_COUNT = 10;
const DESTINATION_COUNT = 9;

export default class PointsModel {
  #points = new Array(POINT_COUNT).fill().map(generateMockPoint);
  #destinations = new Array(DESTINATION_COUNT).fill().map(generateMockDestination);
  #offers = offers;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
