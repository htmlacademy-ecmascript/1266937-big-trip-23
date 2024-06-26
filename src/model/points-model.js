import Observable from '../framework/observable';
import {UpdateType} from '../constants';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #destinationsModel = null;
  #offersModel = null;
  isFailedLoad = false;

  constructor({pointsApiService, destinationsModel, offersModel}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init(),
      ]);

      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);

    } catch (err) {
      this.#points = [];
      this.isFailedLoad = true;
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);

    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);

    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);

    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      price: point['base_price'],
      startTime: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      endTime: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
