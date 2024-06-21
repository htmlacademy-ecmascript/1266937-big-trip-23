import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {NEW_POINT, POINT_TYPES, TimeFormatDisplay} from '../constants.js';
import {capitalizeFirstLetter, getLastCharacter} from '../utils/common-utils.js';
import {humanizeEventDate} from '../utils/point-utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createPointTypeListTemplate = (types, activeType) => (
  types.map((type) => (
    `<div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${activeType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}"
        for="event-type-${type}-1">${capitalizeFirstLetter(type)}
      </label>
    </div>`)).join('')
);

const createCityListTemplate = (destinations) => (
  destinations.map((destination) => (
    `<option value=${destination.city}></option>`
  )).join('')
);

const createOfferListTemplate = (offers, currentOffers) => (
  offers.map((offer) => {
    const isChecked = currentOffers.includes(offer.id);

    return (`<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${offer.id}"
        type="checkbox"
        name="event-offer-${getLastCharacter(offer.title)}"
        ${isChecked ? 'checked' : ''}
      >
      <label
        class="event__offer-label"
        for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`);
  }).join('')
);

const createOfferSectionTemplate = (offers, currentOffers) => {
  const offerListTemplate = createOfferListTemplate(offers, currentOffers);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerListTemplate}
      </div>
    </section>`);
};

const createPictureListTemplate = (pictures) => (
  pictures.map((picture) => (
    `<img
      class="event__photo"
      src=${picture.src}
      alt="${picture.description}">
    </img>`
  )).join('')
);

const createDestinationSectionTemplate = (description, pictures) => {
  const pictureListTemplate = createPictureListTemplate(pictures);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${pictures.length ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictureListTemplate}
        </div>
      </div>` : ''}
    </section>`);
};

const createPointFormTemplate = (point, destinations, offers) => {
  const {
    type,
    startTime,
    endTime,
    destination: currentDestinationId,
    price,
    offers: currentOfferIds,
    id,
    isSaving,
    isDeleting,
    isDisabled
  } = point;

  const availableOffers = offers.find((offer) => offer.type === type)?.offers || [];

  const currentDestination = destinations.find((destination) => destination.id === currentDestinationId) || {};

  const {
    city = '',
    description,
    pictures
  } = currentDestination;

  const pointTypeListTemplate = createPointTypeListTemplate(POINT_TYPES, type);
  const cityListTemplate = createCityListTemplate(destinations);
  const offerSectionTemplate = availableOffers.length > 0 ? createOfferSectionTemplate(availableOffers, currentOfferIds) : '';
  const destinationSectionTemplate = description || pictures?.length > 0 ? createDestinationSectionTemplate(description, pictures) : '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17" height="17"
                src="img/icons/${type}.png"
                alt="Event type icon"
              >
            </label>
            <input
              class="event__type-toggle  visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
            >
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${pointTypeListTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text" 
              name="event-destination"
              value="${he.encode(city)}"
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${cityListTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${humanizeEventDate(startTime, TimeFormatDisplay.DATE_TIME)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${humanizeEventDate(endTime, TimeFormatDisplay.DATE_TIME)}"
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              min="1"
              value=${price}
              required
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">
            ${isSaving ? 'Saving...' : 'Save'}
          </button>

          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${id ? `${isDeleting ? 'Deleting...' : 'Delete'}` : 'Cancel'}
          </button>

          ${id ? `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` : ''}

        </header>
        <section class="event__details">
          ${offerSectionTemplate}
          ${destinationSectionTemplate}
        </section >
      </form >
    </li >`
  );
};

export default class PointFormView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];
  #handleArrowUpClick = null;
  #handleFormSubmit = null;
  #handleDeleteButtonClick = null;
  #startDatePicker = null;
  #endDatePicker = null;

  constructor({point = NEW_POINT, destinations, offers, onArrowUpClick, onFormSubmit, onDeleteButtonClick}) {
    super();
    this._setState(PointFormView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleArrowUpClick = onArrowUpClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteButtonClick = onDeleteButtonClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointFormTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatePicker) {
      this.#startDatePicker.destroy();
      this.#startDatePicker = null;
    }

    if (this.#endDatePicker) {
      this.#endDatePicker.destroy();
      this.#endDatePicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    const rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    const availableOffersElement = this.element.querySelector('.event__available-offers');

    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#arrowUpClickHandler);
    }

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    if (availableOffersElement) {
      availableOffersElement.addEventListener('change', this.#offerChangeHandler);
    }

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteButtonClickHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.#setStartDatePicker();
    this.#setEndDatePicker();
  }

  #setStartDatePicker() {
    this.#startDatePicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: TimeFormatDisplay.FLATPICKR_DATE_TIME,
        defaultDate: this._state.startTime,
        enableTime: true,
        'time_24hr': true,
        onChange: this.#startDateChangeHandler,
      }
    );
  }

  #setEndDatePicker() {
    this.#endDatePicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: TimeFormatDisplay.FLATPICKR_DATE_TIME,
        defaultDate: this._state.endTime,
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.startTime,
        onChange: this.#endDateChangeHandler,
      }
    );
  }

  #startDateChangeHandler = ([userDate]) => {
    this._setState({
      startTime: userDate
    });
    this.#setEndDatePicker('minDate', userDate);
  };

  #endDateChangeHandler = ([userDate]) => {
    this._setState({
      endTime: userDate
    });
  };

  #arrowUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleArrowUpClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointFormView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    let offers = [...this._state.offers];

    if (evt.target.checked) {
      offers.push(evt.target.id);
    } else {
      offers = this._state.offers.filter((offer) => offer !== evt.target.id);
    }
    this.updateElement(
      {offers}
    );
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const currentDestination = this.#destinations.find((destination) => destination.city === evt.target.value);

    if (currentDestination) {
      this.updateElement({
        destination: currentDestination.id
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      price: Number(evt.target.value)
    });
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteButtonClick(PointFormView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {

    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
