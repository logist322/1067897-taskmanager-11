import MenuComponent from './components/site-menu.js';
import FilterComponent from './components/site-filter.js';
import BoardController from './controllers/board.js';
import BoardComponent from './components/board.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/tasks.js';
import {render} from './utils/render.js';

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new MenuComponent());
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent);
boardController.render(tasks);
