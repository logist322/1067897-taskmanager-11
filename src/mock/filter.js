import {FILTER_NAMES} from '../const.js';

export const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.round(Math.random() * 20)
    };
  });
};

