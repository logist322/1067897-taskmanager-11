import {DESCRIPTIONS, COLORS} from '../const.js';
import {getRandomElementFromArray, getRandomIntegerNumber} from '../utils.js';

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'wd': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sing = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sing * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateTask = () => {
  const dueDate = Math.random() > 1 ? null : getRandomDate();

  return {
    description: getRandomElementFromArray(DESCRIPTIONS),
    dueDate,
    repeatingDays: Object.assign({}, DefaultRepeatingDays, {'mo': Math.random() > 0.5}),
    color: getRandomElementFromArray(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
