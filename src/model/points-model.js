import {generateMockPoint} from '../mock/point';
import {offers} from '../mock/offers';
import {destinations} from '../mock/destinations';

const POINT_COUNT = 10;

export default class PointsModel {
  #points = new Array(POINT_COUNT).fill().map(generateMockPoint);
  #destinations = destinations;
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
