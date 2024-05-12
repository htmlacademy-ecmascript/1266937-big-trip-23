import {generateMockDestination} from '../mock/destinations';
import {generateMockPoint} from '../mock/point';
import {offers} from '../mock/offers';

const POINT_COUNT = 4;

const DESTINATION_COUNT = 9;

export default class PointsModel {
  points = new Array(POINT_COUNT).fill().map(generateMockPoint);
  destinations = new Array(DESTINATION_COUNT).fill().map(generateMockDestination);
  offers = offers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
