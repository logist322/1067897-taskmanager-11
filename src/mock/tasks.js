import {DESCRIPTIONS, COLORS, DAYS} from '../const.js';
import {getRandomElementFromArray, getRandomDate} from '../utils.js';

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'wd': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const RandomRepeatingDays = function () {
  DAYS.forEach((day) => {
    this[day] = Math.random() > 0.5;
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomElementFromArray(DESCRIPTIONS),
    dueDate,
    repeatingDays: Math.random() > 0.5 ? DefaultRepeatingDays : new RandomRepeatingDays(),
    color: getRandomElementFromArray(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
