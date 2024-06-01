import AbstractView from '../framework/view/abstract-view';
import {SortingOption} from '../constants';


const createSortingItemTemplate = (sortingOption, currentSortingOption) => (
  `<div class="trip-sort__item  trip-sort__item--${sortingOption}">
    <input
    class="trip-sort__input  visually-hidden"
    id="sort-${sortingOption}"
    type="radio"
    name="trip-${sortingOption}"
    value="sort-${sortingOption}"
    ${currentSortingOption === sortingOption ? 'checked' : ''}
    ${(sortingOption === SortingOption.EVENT || sortingOption === SortingOption.OFFERS) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortingOption}">${sortingOption}</label>
  </div>`
);

const createSortingFormTemplate = () => {
  const sortingItemsTemplate = Object.values(SortingOption)
    .map((sortingItem) => createSortingItemTemplate(sortingItem))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingItemsTemplate}
    </form>`
  );
};

export default class SortingView extends AbstractView {
  #handleSortingOptionChange = null;

  constructor({onSortingOptionChange}) {
    super();
    this.#handleSortingOptionChange = onSortingOptionChange;

    this.element.addEventListener('change', this.#sortingOptionChangeHandler);
  }

  get template() {
    return createSortingFormTemplate();
  }

  #sortingOptionChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortingOptionChange(evt.target.id);
  };
}
