import MenuComponent from './components/site-menu.js';
import FilterComponent from './components/site-filter.js';
import BoardComponent from './components/board.js';
import NewTaskComponent from './components/new-task.js';
import TaskComponent from './components/task.js';
import TasksComponent from './components/tasks.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import SortComponent from './components/sort.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/tasks.js';
import {render} from './utils.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const editButtonHandler = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(newTaskComponent.getElement(), taskComponent.getElement());
  };

  const submitButtonHandler = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), newTaskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButtonElement = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButtonElement.addEventListener(`click`, editButtonHandler);

  const newTaskComponent = new NewTaskComponent(task);
  const submitButtonElement = newTaskComponent.getElement().querySelector(`form`);
  submitButtonElement.addEventListener(`submit`, submitButtonHandler);

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new SortComponent().getElement());
  render(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  render(boardComponent.getElement(), new LoadMoreButtonComponent().getElement());

  const loadMoreButoonElement = boardComponent.getElement().querySelector(`.load-more`);

  loadMoreButoonElement.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;

    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    if (showingTasksCount >= tasks.length) {
      loadMoreButoonElement.remove();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

// render(siteHeaderElement, createSiteMenuTemplate());

// render(siteMainElement, createSiteFilterTemplate(filters));
// render(siteMainElement, createBoardTemplate());

// const siteBoardElement = siteMainElement.querySelector(`.board`);
// const siteTasksElement = siteBoardElement.querySelector(`.board__tasks`);


// render(siteTasksElement, createNewTaskTemplate(tasks[0]));

// let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

// tasks.slice(1, showingTasksCount).forEach((task) => {
//   render(siteTasksElement, createTaskTemplate(task));
// });

// render(siteBoardElement, createLoadMoreButtonTemplate());

// const loadMoreButoonElement = siteBoardElement.querySelector(`.load-more`);

// loadMoreButoonElement.addEventListener(`click`, () => {
//   const prevTasksCount = showingTasksCount;

//   showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

//   tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
//     render(siteTasksElement, createTaskTemplate(task));
//   });

//   if (showingTasksCount >= tasks.length) {
//     loadMoreButoonElement.remove();
//   }
// });

render(siteHeaderElement, new MenuComponent().getElement());
render(siteMainElement, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent.getElement());
renderBoard(boardComponent, tasks);
