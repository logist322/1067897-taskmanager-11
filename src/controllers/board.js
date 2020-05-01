import SortComponent from '../components/sort.js';
import NewTaskComponent from '../components/new-task.js';
import TaskComponent from '../components/task.js';
import TasksComponent from '../components/tasks.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import {render, replace, remove} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const escapeButtonHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replace(taskComponent, newTaskComponent);
      document.removeEventListener(`keydown`, escapeButtonHandler);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditClickHandler((evt) => {
    evt.preventDefault();
    replace(newTaskComponent, taskComponent);
    document.addEventListener(`keydown`, escapeButtonHandler);
  });

  const newTaskComponent = new NewTaskComponent(task);
  newTaskComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replace(taskComponent, newTaskComponent);
  });

  render(taskListElement, taskComponent);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();

    const isAllTasksArchived = !tasks.some((task) => !task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);

      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    tasks.slice(0, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;

      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
        renderTask(taskListElement, task);
      });

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
