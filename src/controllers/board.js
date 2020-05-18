import SortComponent, {SortType} from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import {render, remove} from '../utils/render.js';
import TaskController, {Mode as TaskControllerMode, EmptyTask} from './task.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks, dataChangeHandler, viewChangeHandler) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, dataChangeHandler, viewChangeHandler);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks, sortType) => {
  let sortedTasks = [];

  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;

    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;

    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks;
};

export default class BoardController {
  constructor(container, tasksModel, api) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._api = api;

    this._tasksToShow = null;
    this._showedTaskControllers = [];
    this._creatingTask = null;
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._loadMoreButtonClickHandler = this._loadMoreButtonClickHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._tasksModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  render() {
    const container = this._container.getElement();

    this._tasksToShow = this._tasksModel.getTasks();

    const isAllTasksArchived = !this._tasksToShow.some((task) => !task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);

      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    this._renderTasks(this._tasksToShow.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._tasksComponent.getElement();
    this._creatingTask = new TaskController(taskListElement, this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = [this._creatingTask, ...this._showedTaskControllers];
    this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  }

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
  }

  _renderTasks(tasks) {
    const newTasks = renderTasks(this._tasksComponent.getElement(), tasks, this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = [...this._showedTaskControllers, ...newTasks];
  }

  _loadMoreButtonClickHandler() {
    const prevTasksCount = this._showingTasksCount;

    this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    const newTasks = renderTasks(this._tasksComponent.getElement(), this._tasksToShow.slice(prevTasksCount, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    if (this._showingTasksCount >= this._tasksToShow.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasksToShow.length) {
      return;
    }

    render(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._loadMoreButtonClickHandler);
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _updateTasks(isDefaultTaskCount = true) {
    this._removeTasks();

    if (isDefaultTaskCount) {
      this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    }

    this._tasksToShow = this._tasksModel.getTasks().slice();

    this._renderTasks(this._tasksToShow.slice(0, this._showingTasksCount));
    this._renderLoadMoreButton();
  }

  _dataChangeHandler(oldData, newData) {
    const index = this._tasksToShow.findIndex((task) => task === oldData);

    if (oldData === EmptyTask) {
      this._creatingTask = null;

      if (newData === null) {
        this._showedTaskControllers[0].destroy();
        this._updateTasks();
      } else {
        this._showedTaskControllers[0].waitRequest();

        this._api.createTask(newData.toRAW())
          .then((taskModel) => {
            this._tasksModel.addTask(taskModel);
            this._updateTasks();
          })
          .catch(() => {
            this._showedTaskControllers[0].onError();
          });
      }
    } else if (newData === null) {
      this._showedTaskControllers[index].waitRequest();

      this._api.deleteTask(oldData.id)
        .then(() => {
          this._tasksModel.removeTask(oldData.id);
          this._updateTasks();
        })
        .catch(() => {
          this._showedTaskControllers[index].onError();
        });
    } else {
      this._showedTaskControllers[index].waitRequest();

      this._api.updateTask(oldData.id, newData.toRAW())
        .then((taskModel) => {
          const isSuccess = this._tasksModel.updateTask(oldData.id, taskModel);

          if (isSuccess) {
            const shownIndex = this._tasksToShow.findIndex((it) => oldData === it);

            this._tasksToShow = [...this._tasksToShow.slice(0, shownIndex), taskModel, ...this._tasksToShow.slice(shownIndex + 1)];
            this._updateTasks(false);
          }
        })
        .catch(() => {
          this._showedTaskControllers[index].onError();
        });
    }
  }

  _viewChangeHandler() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _sortTypeChangeHandler(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._tasksToShow = getSortedTasks(this._tasksModel.getTasks(), sortType);

    this._removeTasks();

    this._renderTasks(this._tasksToShow.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  _filterChangeHandler() {
    this._updateTasks();
  }
}
