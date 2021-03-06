import MenuComponent, {MenuItem} from './components/site-menu.js';
import FilterController from './controllers/filter.js';
import BoardController from './controllers/board.js';
import BoardComponent from './components/board.js';
import StatisticsComponent from "./components/statistics.js";
import TasksModel from './models/tasks.js';
import {render} from './utils/render.js';
import API from './api.js';

const AUTHORIZATION = `Basic asdhGSJAdhglSADG`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  return new Date(dateTo).setDate(dateTo.getDate() - 7);
})();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new API(AUTHORIZATION, END_POINT);

const tasksModel = new TasksModel();

const filterController = new FilterController(siteMainElement, tasksModel);
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
const menuComponent = new MenuComponent();

render(siteHeaderElement, menuComponent);
filterController.render();
render(siteMainElement, boardComponent);
boardComponent.getElement().innerHTML = `<p class="board__no-tasks">Loading...</p>`;
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getTasks()
  .then((tasks) => {
    boardComponent.getElement().innerHTML = ``;
    tasksModel.setTasks(tasks);
    boardController.render();
  });

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;

    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;

    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
  }
});
