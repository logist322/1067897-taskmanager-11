import {DESCRIPTIONS, COLORS, DAYS} from '../const.js';
import {getRandomElementFromArray, getRandomDate} from '../utils/common.js';

const getRepeatingDays = (isRandom) => {
  const setDay = isRandom ? () => Math.random() > 0.5 : () => false;

  return DAYS.reduce((obj, day) => {
    obj[day] = setDay();
    return obj;
  }, {});
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomElementFromArray(DESCRIPTIONS),
    dueDate,
    repeatingDays: getRepeatingDays(Math.random() > 0.5),
    color: getRandomElementFromArray(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
