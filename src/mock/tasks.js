import {DESCRIPTIONS, COLORS, DAYS} from '../const.js';
import {getRandomElementFromArray, getRandomDate} from '../utils.js';

const getRepeatingDays = (method = `random`) => {
  let setDay;

  switch (method) {
    case `random`:
      setDay = () => Math.random() > 0.5;
      break;

    case `default`:
      setDay = () => false;
      break;

    default:
      throw new Error(`Only 'random' or 'default'`);
  }

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
    repeatingDays: Math.random() > 0.5 ? getRepeatingDays(`default`) : getRepeatingDays(),
    color: getRandomElementFromArray(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
