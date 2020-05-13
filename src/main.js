import MenuComponent, {MenuItem} from './components/site-menu.js';
import FilterController from './controllers/filter.js';
import BoardController from './controllers/board.js';
import BoardComponent from './components/board.js';
import StatisticsComponent from "./components/statistics.js";
import TasksModel from './models/tasks.js';
import {generateTasks} from './mock/tasks.js';
import {render} from './utils/render.js';

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const menuComponent = new MenuComponent();

render(siteHeaderElement, menuComponent);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

const dateTo = new Date();
const dateFrom = (() => {
  return new Date(dateTo).setDate(dateTo.getDate() - 7);
})();

const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

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
