import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filterOption, currentFilterOption, isEmpty) => (
  `<div class="trip-filters__filter">
    <input
      id="filter-${filterOption}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${filterOption}"
      ${filterOption === currentFilterOption ? 'checked' : ''}
      ${isEmpty ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filterOption}">${filterOption}</label>
  </div> `
);

const createFilterFormTemplate = (filterItems, currentFilterOption) => {
  const filterItemsTemplate = filterItems
    .map((filterItem) => createFilterItemTemplate(filterItem, currentFilterOption))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterOption = null;
  #handleFilterOptionChange = null;


  constructor({filters, onFilterOptionChange, currentFilterOption}) {
    super();
    this.#filters = filters;
    this.#currentFilterOption = currentFilterOption;
    this.#handleFilterOptionChange = onFilterOptionChange;

    this.element.addEventListener('change', this.#filterOptionChangeHandler);
  }

  get template() {
    return createFilterFormTemplate(this.#filters, this.#currentFilterOption);
  }

  #filterOptionChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterOptionChange(evt.target.value);
  };
}
