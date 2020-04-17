import createSiteMenuTemplate from './components/site-menu.js';
import createSiteFilterTemplate from './components/site-filter.js';
import createBoardTemplate from './components/board.js';
import createNewTaskTemplate from './components/new-task.js';
import createTaskTemplate from './components/task.js';
import createLoadMoreButtonTemplate from './components/load-more-button.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/tasks.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());

const filters = generateFilters();

render(siteMainElement, createSiteFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteTasksElement = siteBoardElement.querySelector(`.board__tasks`);

const tasks = generateTasks(TASK_COUNT);

render(siteTasksElement, createNewTaskTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) => {
  render(siteTasksElement, createTaskTemplate(task));
});

render(siteBoardElement, createLoadMoreButtonTemplate());

const loadMoreButoonElement = siteBoardElement.querySelector(`.load-more`);

loadMoreButoonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;

  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
    render(siteTasksElement, createTaskTemplate(task));
  });

  if (showingTasksCount >= tasks.length) {
    loadMoreButoonElement.remove();
  }
});
