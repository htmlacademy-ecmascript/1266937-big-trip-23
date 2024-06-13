import Observable from '../framework/observable';
import {FilterOption} from '../constants';


export default class FilterModel extends Observable {
  #filter = FilterOption.DEFAULT;

  // TODO
  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
