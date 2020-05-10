import SiteFilterComponent from '../components/site-filter.js';
import {FilterType} from '../const.js';
import {render, replace} from '../utils/render.js';
import {getTasksByFilter} from '../utils/filter.js';

export default class Filter {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._activeFilterType = FilterType.ALL;
    this._siteFilterComponent = null;

    this._dataChangehandler = this._dataChangehandler.bind(this);
    this._filterChangehandler = this._filterChangehandler.bind(this);

    this._tasksModel.setDataChangeHandler(this._dataChangehandler);
  }

  render() {
    const container = this._container;
    const allTasks = this._tasksModel.getAllTasks();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getTasksByFilter(allTasks, filterType).length,
        isChecked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._siteFilterComponent;

    this._siteFilterComponent = new SiteFilterComponent(filters);
    this._siteFilterComponent.setFilterChangeHandler(this._filterChangehandler);

    if (oldComponent) {
      replace(this._siteFilterComponent, oldComponent);
    } else {
      render(container, this._siteFilterComponent);
    }
  }

  _filterChangehandler(filterType) {
    this._tasksModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _dataChangehandler() {
    this.render();
  }
}
