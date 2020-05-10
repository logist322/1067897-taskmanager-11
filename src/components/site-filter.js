import AbstractComponent from './abstract-component.js';

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createSiteFilterMarkup = (filter) => {
  const {name, count, isChecked} = filter;

  return (
    `<input
      type="radio"
      id="${FILTER_ID_PREFIX}${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="${FILTER_ID_PREFIX}${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const createSiteFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) =>
    createSiteFilterMarkup(it)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createSiteFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);

      handler(filterName);
    });
  }
}
