import AbstractView from '../framework/view/abstract-view';
import {FilterOption} from '../constants';

const EmptyListMessageOption = {
  [FilterOption.DEFAULT]: 'Click New Event to create your first point',
  [FilterOption.FUTURE]: 'There are no future events now',
  [FilterOption.PRESENT]: 'There are no present events now',
  [FilterOption.PAST]: 'There are no past events now',
};


const createEmptyListTemplate = (filterOption) => {
  const EmptyListMessage = EmptyListMessageOption[filterOption];

  return (
    `<p class="trip-events__msg">
      ${EmptyListMessage}
    </p>`
  );
};

export default class EmptyListView extends AbstractView {
  #filterOption = null;

  constructor({filterOption}) {
    super();
    this.#filterOption = filterOption;
  }

  get template() {
    return createEmptyListTemplate(this.#filterOption);
  }
}
