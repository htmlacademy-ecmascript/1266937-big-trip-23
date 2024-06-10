import Observable from '../framework/observable';
import {generateMockPoint} from '../mock/point';

const POINT_COUNT = 10;

export default class PointsModel extends Observable {
  #points = new Array(POINT_COUNT).fill().map(generateMockPoint);

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  get points() {
    return this.#points;
  }
}
