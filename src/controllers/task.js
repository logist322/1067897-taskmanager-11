import NewTaskComponent from '../components/new-task.js';
import TaskComponent from '../components/task.js';
import {render, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldNewTaskComponent = this._newTaskComponent;

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
    this._newTaskComponent.setSubmitHandler(this._replaceNewToTask);

    if (oldTaskComponent && oldNewTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._newTaskComponent, oldNewTaskComponent);

      return;
    }

    render(this._container, this._taskComponent);
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

    replace(this._taskComponent, this._newTaskComponent);
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
