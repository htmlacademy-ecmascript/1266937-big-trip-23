import {generateMockPoint} from '../mock/point';

const POINT_COUNT = 3;

export default class PointsModel {
  points = new Array(POINT_COUNT).fill().map(generateMockPoint);

  getPoints() {
    return this.points;
  }
}
