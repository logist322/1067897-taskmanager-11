import SortComponent, {SortType} from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import {render, remove} from '../utils/render.js';
import TaskController from './task.js';

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
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._tasksToShow = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

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
      render(container, this._noTasksComponent);

      return;
    }

    render(this._container.getElement(), this._sortComponent);
    render(this._container.getElement(), this._tasksComponent);

    const newTasks = renderTasks(this._tasksComponent.getElement(), this._tasksToShow.slice(0, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasksToShow.length) {
      return;
    }

    render(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;

      this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      const newTasks = renderTasks(this._tasksComponent.getElement(), this._tasksToShow.slice(prevTasksCount, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasksToShow.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _dataChangeHandler(oldData, newData) {
    const index = this._tasks.findIndex((it) => oldData === it);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    const shownIndex = this._tasksToShow.findIndex((it) => oldData === it);
    this._tasksToShow = [].concat(this._tasksToShow.slice(0, shownIndex), newData, this._tasksToShow.slice(shownIndex + 1));

    this._showedTaskControllers[shownIndex].render(this._tasks[index]);
  }

  _viewChangeHandler() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _sortTypeChangeHandler(sortType) {
    remove(this._loadMoreButtonComponent);

    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._tasksToShow = getSortedTasks(this._tasks, sortType);

    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, this._tasksToShow.slice(0, this._showingTasksCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }
}
