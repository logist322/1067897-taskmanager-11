/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/abstract-smart-component.js":
/*!****************************************************!*\
  !*** ./src/components/abstract-smart-component.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractSmartComponent; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


class AbstractSmartComponent extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}


/***/ }),

/***/ "./src/components/board.js":
/*!*********************************!*\
  !*** ./src/components/board.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

class Board extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createBoardTemplate();
  }
}


/***/ }),

/***/ "./src/components/color-markup.js":
/*!****************************************!*\
  !*** ./src/components/color-markup.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const createColorsMarkup = (colors, currentColor) => {
  return colors.map((color, index) => {
    return (
      `<input
        type="radio"
        id="color-${color}-${index}"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${color === currentColor ? `checked` : ``}
      />
      <label
        for="color-${color}-${index}"
        class="card__color card__color--${color}"
        >${color}</label
      >`
    );
  }).join(`\n`);
};

/* harmony default export */ __webpack_exports__["default"] = (createColorsMarkup);


/***/ }),

/***/ "./src/components/load-more-button.js":
/*!********************************************!*\
  !*** ./src/components/load-more-button.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoadMoreButton; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMoreButton extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/new-task.js":
/*!************************************!*\
  !*** ./src/components/new-task.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewTask; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _color_markup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-markup.js */ "./src/components/color-markup.js");
/* harmony import */ var _repeating_days_markup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repeating-days-markup.js */ "./src/components/repeating-days-markup.js");
/* harmony import */ var _abstract_smart_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./abstract-smart-component.js */ "./src/components/abstract-smart-component.js");






const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const createNewTaskTemplate = (task, options = {}) => {
  const {description, dueDate, color} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays} = options;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isBlockSaveButton = (isDateShowing && isRepeatingTask) || (isRepeatingTask && !isRepeating(activeRepeatingDays));

  const date = (isDateShowing && dueDate) ? `${dueDate.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_1__["MONTH_NAMES"][dueDate.getMonth()]}` : ``;
  const time = (isDateShowing && dueDate) ? `${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(dueDate)}` : ``;

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const colorsMarkup = Object(_color_markup_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["COLORS"], color);
  const repeatingDaysMarkup = Object(_repeating_days_markup_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["DAYS"], activeRepeatingDays);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                ${
    isDateShowing ?
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"
          />
        </label>
      </fieldset>`
      : ``
    }

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>

                ${
    isRepeatingTask ?
      `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${repeatingDaysMarkup}
        </div>
      </fieldset>`
      : ``
    }

              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

class NewTask extends _abstract_smart_component_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._submitHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewTaskTemplate(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;

      this.rerender();
    });

    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      this._isRepeatingTask = !this._isRepeatingTask;

      this.rerender();
    });

    const repeatDays = element.querySelector(`.card__repeat-days`);

    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }
}


/***/ }),

/***/ "./src/components/no-tasks.js":
/*!************************************!*\
  !*** ./src/components/no-tasks.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoTasks; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createNoTasksTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};

class NoTasks extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createNoTasksTemplate();
  }
}


/***/ }),

/***/ "./src/components/repeating-days-markup.js":
/*!*************************************************!*\
  !*** ./src/components/repeating-days-markup.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days.map((day, index) => {
    const isChecked = repeatingDays[day];

    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${index}"
        name="repeat"
        value="${day}"
        ${isChecked ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-${index}"
        >${day}</label
      >`
    );
  }).join(`\n`);
};

/* harmony default export */ __webpack_exports__["default"] = (createRepeatingDaysMarkup);


/***/ }),

/***/ "./src/components/site-filter.js":
/*!***************************************!*\
  !*** ./src/components/site-filter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createSiteFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const createSiteFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) =>
    createSiteFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

class Filter extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createSiteFilterTemplate(this._filters);
  }
}


/***/ }),

/***/ "./src/components/site-menu.js":
/*!*************************************!*\
  !*** ./src/components/site-menu.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createSiteMenuTemplate = () => {
  return (
    `<section class="control__btn-wrap">
      <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
      />
      <label for="control__new-task" class="control__label control__label--new-task"
        >+ ADD NEW TASK</label
      >
      <input
        type="radio"
        name="control"
        id="control__task"
        class="control__input visually-hidden"
        checked
      />
      <label for="control__task" class="control__label">TASKS</label>
      <input
        type="radio"
        name="control"
        id="control__statistic"
        class="control__input visually-hidden"
      />
      <label for="control__statistic" class="control__label"
        >STATISTICS</label
      >
    </section>`
  );
};

class Menu extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: SortType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};

class Sort extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}


/***/ }),

/***/ "./src/components/task.js":
/*!********************************!*\
  !*** ./src/components/task.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Task; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");




const createTaskTemplate = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isFavorite} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDataShowind = !!dueDate;

  const date = isDataShowind ? `${dueDate.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_1__["MONTH_NAMES"][dueDate.getMonth()]}` : ``;
  const time = isDataShowind ? `${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(dueDate)}` : ``;

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

class Task extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
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
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/tasks.js":
/*!*********************************!*\
  !*** ./src/components/tasks.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tasks; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createTasksTemplate = () => {
  return (
    `<div class="board__tasks">
    </div>`
  );
};

class Tasks extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createTasksTemplate();
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: FILTER_NAMES, DAYS, MONTH_NAMES, COLORS, DESCRIPTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_NAMES", function() { return FILTER_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAYS", function() { return DAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESCRIPTIONS", function() { return DESCRIPTIONS; });
const FILTER_NAMES = [`all`, `overdue`, `today`, `favorites`, `repeating`, `arhive`];

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];


/***/ }),

/***/ "./src/controllers/board.js":
/*!**********************************!*\
  !*** ./src/controllers/board.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoardController; });
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/tasks.js */ "./src/components/tasks.js");
/* harmony import */ var _components_load_more_button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/load-more-button.js */ "./src/components/load-more-button.js");
/* harmony import */ var _components_no_tasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/no-tasks.js */ "./src/components/no-tasks.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./task.js */ "./src/controllers/task.js");







const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks, dataChangeHandler, viewChangeHandler) => {
  return tasks.map((task) => {
    const taskController = new _task_js__WEBPACK_IMPORTED_MODULE_5__["default"](taskListElement, dataChangeHandler, viewChangeHandler);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks, sortType) => {
  let sortedTasks = [];

  const showingTasks = tasks.slice();

  switch (sortType) {
    case _components_sort_js__WEBPACK_IMPORTED_MODULE_0__["SortType"].DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;

    case _components_sort_js__WEBPACK_IMPORTED_MODULE_0__["SortType"].DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;

    case _components_sort_js__WEBPACK_IMPORTED_MODULE_0__["SortType"].DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks;
};

class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._tasksToShow = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._noTasksComponent = new _components_no_tasks_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._sortComponent = new _components_sort_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._tasksComponent = new _components_tasks_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this._loadMoreButtonComponent = new _components_load_more_button_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();

    this._tasksToShow = this._tasks.slice();

    const isAllTasksArchived = !this._tasksToShow.some((task) => !task.isArchive);

    if (isAllTasksArchived) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(container, this._noTasksComponent);

      return;
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(this._container.getElement(), this._sortComponent);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(this._container.getElement(), this._tasksComponent);

    const newTasks = renderTasks(this._tasksComponent.getElement(), this._tasksToShow.slice(0, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasksToShow.length) {
      return;
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["render"])(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;

      this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      const newTasks = renderTasks(this._tasksComponent.getElement(), this._tasksToShow.slice(prevTasksCount, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasksToShow.length) {
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["remove"])(this._loadMoreButtonComponent);
      }
    });
  }

  _dataChangeHandler(oldData, newData) {
    const index = this._tasks.findIndex((it) => oldData === it);

    if (index === -1) {
      return;
    }

    this._tasks = [...this._tasks.slice(0, index), newData, ...this._tasks.slice(index + 1)];

    const shownIndex = this._tasksToShow.findIndex((it) => oldData === it);
    this._tasksToShow = [...this._tasksToShow.slice(0, shownIndex), newData, ...this._tasksToShow.slice(shownIndex + 1)];

    this._showedTaskControllers[shownIndex].render(this._tasks[index]);
  }

  _viewChangeHandler() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _sortTypeChangeHandler(sortType) {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_4__["remove"])(this._loadMoreButtonComponent);

    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._tasksToShow = getSortedTasks(this._tasks, sortType);

    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, this._tasksToShow.slice(0, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }
}


/***/ }),

/***/ "./src/controllers/task.js":
/*!*********************************!*\
  !*** ./src/controllers/task.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskController; });
/* harmony import */ var _components_new_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/new-task.js */ "./src/components/new-task.js");
/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/task.js */ "./src/components/task.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");




const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

class TaskController {
  constructor(container, dataChangeHander, viewChangeHandler) {
    this._container = container;
    this._dataChangeHander = dataChangeHander;

    this._viewChangeHandler = viewChangeHandler;
    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._newTaskComponent = null;

    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
    this._replaceTaskToNew = this._replaceTaskToNew.bind(this);
    this._replaceNewToTask = this._replaceNewToTask.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldNewTaskComponent = this._newTaskComponent;

    this._taskComponent = new _components_task_js__WEBPACK_IMPORTED_MODULE_1__["default"](task);
    this._taskComponent.setEditClickHandler(this._replaceTaskToNew);

    this._taskComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      this._dataChangeHander(task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskComponent.setArchiveButtonClickHandler((evt) => {
      evt.preventDefault();

      this._dataChangeHander(task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._newTaskComponent = new _components_new_task_js__WEBPACK_IMPORTED_MODULE_0__["default"](task);
    this._newTaskComponent.setSubmitHandler(this._replaceNewToTask);

    if (oldTaskComponent && oldNewTaskComponent) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._taskComponent, oldTaskComponent);
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._newTaskComponent, oldNewTaskComponent);

      return;
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(this._container, this._taskComponent);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceNewToTask();
    }
  }

  _replaceTaskToNew(evt) {
    evt.preventDefault();

    this._viewChangeHandler();

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._newTaskComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escapeButtonHandler);

    this._mode = Mode.EDIT;
  }

  _replaceNewToTask(evt) {
    if (evt) {
      evt.preventDefault();
    }

    this._newTaskComponent.reset();

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_2__["replace"])(this._taskComponent, this._newTaskComponent);
    document.removeEventListener(`keydown`, this._escapeButtonHandler);

    this._mode = Mode.DEFAULT;
  }

  _escapeButtonHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._replaceNewToTask();
      document.removeEventListener(`keydown`, this._escapeButtonHandler);
    }
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_site_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/site-menu.js */ "./src/components/site-menu.js");
/* harmony import */ var _components_site_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/site-filter.js */ "./src/components/site-filter.js");
/* harmony import */ var _controllers_board_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/board.js */ "./src/controllers/board.js");
/* harmony import */ var _components_board_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/board.js */ "./src/components/board.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _mock_tasks_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mock/tasks.js */ "./src/mock/tasks.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");








const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = Object(_mock_filter_js__WEBPACK_IMPORTED_MODULE_4__["generateFilters"])();
const tasks = Object(_mock_tasks_js__WEBPACK_IMPORTED_MODULE_5__["generateTasks"])(TASK_COUNT);

Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(siteHeaderElement, new _components_site_menu_js__WEBPACK_IMPORTED_MODULE_0__["default"]());
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(siteMainElement, new _components_site_filter_js__WEBPACK_IMPORTED_MODULE_1__["default"](filters));

const boardComponent = new _components_board_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const boardController = new _controllers_board_js__WEBPACK_IMPORTED_MODULE_2__["default"](boardComponent);

Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(siteMainElement, boardComponent);
boardController.render(tasks);


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilters", function() { return generateFilters; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const generateFilters = () => {
  return _const_js__WEBPACK_IMPORTED_MODULE_0__["FILTER_NAMES"].map((it) => {
    return {
      name: it,
      count: Math.round(Math.random() * 20)
    };
  });
};



/***/ }),

/***/ "./src/mock/tasks.js":
/*!***************************!*\
  !*** ./src/mock/tasks.js ***!
  \***************************/
/*! exports provided: generateTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTasks", function() { return generateTasks; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");



const getRepeatingDays = (isRandom) => {
  const setDay = isRandom ? () => Math.random() > 0.5 : () => false;

  return _const_js__WEBPACK_IMPORTED_MODULE_0__["DAYS"].reduce((obj, day) => {
    obj[day] = setDay();
    return obj;
  }, {});
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomDate"])();

  return {
    description: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["DESCRIPTIONS"]),
    dueDate,
    repeatingDays: getRepeatingDays(Math.random() > 0.5),
    color: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["COLORS"]),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: formatTime, getRandomIntegerNumber, getRandomElementFromArray, getRandomDate, createElement, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIntegerNumber", function() { return getRandomIntegerNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomElementFromArray", function() { return getRandomElementFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomDate", function() { return getRandomDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getRandomElementFromArray = (array) => {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sing = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sing * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(getRandomIntegerNumber(0, 23));
  targetDate.setMinutes(getRandomIntegerNumber(0, 59));

  return targetDate;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, isAfterBegin = false) => {
  if (isAfterBegin) {
    container.prepend(element);
  } else {
    container.append(element);
  }
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: render, replace, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
const render = (container, component, isAfterBegin = false) => {
  if (isAfterBegin) {
    container.prepend(component.getElement());
  } else {
    container.append(component.getElement());
  }
};

const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(newElement && oldElement && parentElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map