import AbstractView from '../framework/view/abstract-view.js';
import {humanizeEventDate, getDuration} from '../utils/point.js';
import {TimeFormatDisplay} from '../constants.js';

// selected offers
const createOfferListTemplate = (offers) => offers.map(({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`)).join('');

const createPointViewTemplate = (point, offers, destinations) => {
  const {
    type,
    startTime,
    endTime,
    isFavorite,
    price,
    destination: currentDestinationId,
    offers: currentOfferIds,
  } = point;

  const availableOffers = offers.find((offer) => offer.type === type)?.offers || [];
  const currentOffers = availableOffers.filter((offer) => currentOfferIds.includes(offer.id));

  const offerListTemplate = createOfferListTemplate(currentOffers);

  const currentDestination = destinations.find((destination) => destination.id === currentDestinationId);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time
          class="event__date"
          datetime=${startTime}
        >
            ${humanizeEventDate(startTime, TimeFormatDisplay.DATE_FORMAT)}
        </time>
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">${type} ${currentDestination.city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time
              class="event__start-time"
              datetime=${startTime}
            >
              ${humanizeEventDate(startTime, TimeFormatDisplay.TIME_FORMAT)}
            </time>
            &mdash;
            <time
              class="event__end-time"
              datetime=${endTime}
            >
              ${humanizeEventDate(endTime, TimeFormatDisplay.TIME_FORMAT)}
            </time>
          </p>
          <p class="event__duration">${getDuration(startTime, endTime)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerListTemplate}
        </ul>
        <button
          class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}"
          type="button"
        >
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #offers = [];
  #destinations = [];
  #handleArrowDownClick = null;
  #handleFavoriteButtonClick = null;

  constructor({point, offers, destinations, onArrowDownClick, onFavoriteButtonClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleArrowDownClick = onArrowDownClick;
    this.#handleFavoriteButtonClick = onFavoriteButtonClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowDownClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createPointViewTemplate(this.#point, this.#offers, this.#destinations);
  }

  #arrowDownClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleArrowDownClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteButtonClick();
  };
}
