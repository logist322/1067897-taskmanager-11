import createSiteMenuTemplate from './components/site-menu.js';
import createSiteFilterTemplate from './components/site-filter.js';
import createBoardTemplate from './components/board.js';
import createNewTaskTemplate from './components/new-task.js';
import createTaskTemplate from './components/task.js';
import createLoadMoreButtonTemplate from './components/load-more-button.js';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSiteFilterTemplate());
render(siteMainElement, createBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteTasksElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteTasksElement, createNewTaskTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTasksElement, createTaskTemplate());
}

render(siteBoardElement, createLoadMoreButtonTemplate());
