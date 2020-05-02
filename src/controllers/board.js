import SortComponent, {SortType} from '../components/sort.js';
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

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => renderTask(taskListElement, task));
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

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasksToShow.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;

        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

        renderTasks(taskListElement, tasksToShow.slice(prevTasksCount, showingTasksCount));

        if (showingTasksCount >= tasksToShow.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();

    let tasksToShow = tasks.slice();

    const isAllTasksArchived = !tasksToShow.some((task) => !task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);

      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasksToShow.slice(0, showingTasksCount));

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      remove(this._loadMoreButtonComponent);

      tasksToShow = getSortedTasks(tasks, sortType);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, tasksToShow.slice(0, showingTasksCount));

      renderLoadMoreButton();
    });
  }
}
