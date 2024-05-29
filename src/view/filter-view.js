import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filterOption, isChecked, isEmpty) => (
  `<div class="trip-filters__filter">
    <input
      id="filter-${filterOption}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${filterOption}"
      ${isChecked ? 'checked' : ''}
      ${isEmpty ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filterOption}">${filterOption}</label>
  </div> `
);

const createFilterFormTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filterItem, index) => createFilterItemTemplate(filterItem, index === 0))
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

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterFormTemplate(this.#filters);
  }
}
