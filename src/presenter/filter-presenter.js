import {remove, render, replace} from '../framework/render';
import FilterView from '../view/filter-view';
import {filterByOptions} from '../utils/filter-utils';
import {UpdateType} from '../constants';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;

  #filterComponent = null;


  constructor({filterContainer, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.keys(filterByOptions);
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterOption: this.#filterModel.filter,
      onFilterOptionChange: this.#handleFilterOptionChange,
    });

    if (prevFilterComponent === null) {
      this.#renderFilters();
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #renderFilters() {
    render(this.#filterComponent, this.#filterContainer);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterOptionChange = (filterOption) => {
    if (this.#filterModel.filter === filterOption) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterOption);
  };
}
