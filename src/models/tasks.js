import {getTasksByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._activeFilter = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getAllTasks() {
    return this._tasks;
  }

  getTasks() {
    return getTasksByFilter(this._tasks, this._activeFilter);
  }

  setTasks(tasks) {
    this._tasks = [...tasks];

    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [...this._tasks.slice(0, index), task, ...this._tasks.slice(index + 1)];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
