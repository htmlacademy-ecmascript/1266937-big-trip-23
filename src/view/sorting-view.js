import AbstractView from '../framework/view/abstract-view';
import {SortingOption} from '../constants';


const createSortingItemTemplate = (sortingOption, currentSortingOption) => (
  `<div class="trip-sort__item  trip-sort__item--${sortingOption}">
    <input
    class="trip-sort__input  visually-hidden"
    data-sorting-option="${sortingOption}"
    id="sort-${sortingOption}"
    type="radio"
    name="trip-${sortingOption}"
    value="sort-${sortingOption}"
    ${sortingOption === currentSortingOption ? 'checked' : ''}
    ${(sortingOption === SortingOption.EVENT || sortingOption === SortingOption.OFFERS) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortingOption}">${sortingOption}</label>
  </div>`
);

const createSortingFormTemplate = (currentSortingOption) => {
  const sortingItemsTemplate = Object.values(SortingOption)
    .map((sortingItem) => createSortingItemTemplate(sortingItem, currentSortingOption))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingItemsTemplate}
    </form>`
  );
};

export default class SortingView extends AbstractView {
  #handleSortingOptionChange = null;
  #currentSortingOption = null;

  constructor({onSortingOptionChange, currentSortingOption}) {
    super();
    this.#currentSortingOption = currentSortingOption;
    this.#handleSortingOptionChange = onSortingOptionChange;

    this.element.addEventListener('change', this.#sortingOptionChangeHandler);
  }

  get template() {
    return createSortingFormTemplate(this.#currentSortingOption);
  }

  #sortingOptionChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortingOptionChange(evt.target.dataset.sortingOption);
  };
}
