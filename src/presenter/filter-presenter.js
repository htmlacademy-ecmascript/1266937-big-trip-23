import {render} from '../framework/render';
import FilterView from '../view/filter-view';
import {filterByOptions} from '../utils/filter-utils';
import {FilterOption} from '../constants';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;

  #filterComponent = null;


  constructor({filterContainer, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
  }

  get filters() {
    return Object.keys(filterByOptions);
  }

  init() {
    const filters = this.filters;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterOption: this.#filterModel.filter,
    });

    this.#renderFilters();
  }

  #renderFilters() {
    render(this.#filterComponent, this.#filterContainer);
  }
}
