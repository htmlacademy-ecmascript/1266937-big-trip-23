import AbstractView from '../framework/view/abstract-view';
import {SortingOption} from '../constants';


const createSortingItemTemplate = (sortingOption, currentSortingOption) => (
  `<div class="trip-sort__item  trip-sort__item--${sortingOption}">
    <input
    id="sort-${sortingOption}"
    class="trip-sort__input  visually-hidden"
    type="radio"
    name="trip-${sortingOption}"
    value="sort-${sortingOption}"
    ${currentSortingOption === sortingOption ? 'checked' : ''}
    ${(sortingOption === SortingOption.EVENT || sortingOption === SortingOption.OFFERS) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortingOption}">${sortingOption}</label>
  </div> `
);

const createSortingFormTemplate = () => {
  const sortingItemsTemplate = Object.values(SortingOption)
    .map((sortingItem) => createSortingItemTemplate(sortingItem))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action ="#" method="get" >
      ${sortingItemsTemplate}
    </form> `
  );
};

export default class SortingView extends AbstractView {
  #currentSortingOption = null;

  constructor(currentSortingOption) {
    super();
    this.#currentSortingOption = currentSortingOption;
  }

  get template() {
    return createSortingFormTemplate(this.#currentSortingOption);
  }
}
