import MenuComponent, {MenuItem} from './components/site-menu.js';
import FilterController from './controllers/filter.js';
import BoardController from './controllers/board.js';
import BoardComponent from './components/board.js';
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

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
