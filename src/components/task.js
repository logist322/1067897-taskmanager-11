import {formatTime, formatDate, isOverdueDate} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

import {encode} from 'he';

const createTaskTemplate = (task) => {
  const {description: notSanitizedDescription, dueDate, color, repeatingDays, isArchive, isFavorite} = task;

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  const isDataShowind = !!dueDate;

  const description = encode(notSanitizedDescription);

  const date = isDataShowind ? `${formatDate(dueDate)}` : ``;
  const time = isDataShowind ? `${formatTime(dueDate)}` : ``;

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const archiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteClass = isFavorite ? `` : `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${favoriteClass}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      evt.target.textContent = `Favoriting...`;
      handler(evt);
    });
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      evt.target.textContent = `Archiving...`;
      handler(evt);
    });
  }

  blockButtons() {
    this.getElement().querySelectorAll(`.card__btn--archive, .card__btn--favorites`).forEach((element) => {
      element.disabled = true;
    });
  }

  unblockButtons() {
    this.getElement().querySelectorAll(`.card__btn--archive, .card__btn--favorites`).forEach((element) => {
      element.disabled = false;
    });
  }

  refreshButtonsText() {
    this.getElement().querySelector(`.card__btn--archive`).textContent = `Archive`;
    this.getElement().querySelector(`.card__btn--favorites`).textContent = `Favorites`;
  }
}
