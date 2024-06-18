import AbstractView from '../framework/view/abstract-view';
import {EmptyListMessageOption} from '../constants';

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
