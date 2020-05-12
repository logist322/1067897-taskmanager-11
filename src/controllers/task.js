import NewTaskComponent from '../components/new-task.js';
import TaskComponent from '../components/task.js';
import {render, replace, remove} from '../utils/render.js';
import {Color} from '../const.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    "mo": false,
    "tu": false,
    "we": false,
    "th": false,
    "fr": false,
    "sa": false,
    "su": false,
  },
  color: Color.BLACK,
  isFavorite: false,
  isArchive: false,
};

export default class TaskController {
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

  render(task, mode = Mode.DEFAULT) {
    const oldTaskComponent = this._taskComponent;
    const oldNewTaskComponent = this._newTaskComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
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

    this._newTaskComponent = new NewTaskComponent(task);
    this._newTaskComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const data = this._newTaskComponent.getData();
      this._dataChangeHander(task, data);
    });

    this._newTaskComponent.setDeleteButtonClickHandler(() => this._dataChangeHander(task, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldNewTaskComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._newTaskComponent, oldNewTaskComponent);
          this._replaceNewToTask();
        } else {
          render(this._container, this._taskComponent);
        }
        break;
      case Mode.ADDING:
        if (oldNewTaskComponent && oldTaskComponent) {
          remove(oldTaskComponent);
          remove(oldNewTaskComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._newTaskComponent, true);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceNewToTask();
    }
  }

  destroy() {
    remove(this._newTaskComponent);
    remove(this._taskComponent);
    document.removeEventListener(`keydown`, this._escapeButtonHandler);
  }

  _replaceTaskToNew(evt) {
    evt.preventDefault();

    this._viewChangeHandler();

    replace(this._newTaskComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escapeButtonHandler);

    this._mode = Mode.EDIT;
  }

  _replaceNewToTask(evt) {
    if (evt) {
      evt.preventDefault();
    }

    this._newTaskComponent.reset();

    document.removeEventListener(`keydown`, this._escapeButtonHandler);

    if (document.contains(this._newTaskComponent.getElement())) {
      replace(this._taskComponent, this._newTaskComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _escapeButtonHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }

      this._replaceNewToTask();
      document.removeEventListener(`keydown`, this._escapeButtonHandler);
    }
  }
}
