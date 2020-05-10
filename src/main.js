import MenuComponent from './components/site-menu.js';
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

render(siteHeaderElement, new MenuComponent());

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();

const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent);
boardController.render();
