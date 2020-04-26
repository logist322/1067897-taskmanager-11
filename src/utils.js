const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

export const getRandomElementFromArray = (array) => {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sing = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sing * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(getRandomIntegerNumber(0, 23));
  targetDate.setMinutes(getRandomIntegerNumber(0, 59));

  return targetDate;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, isAfterBegin = false) => {
  if (isAfterBegin) {
    container.prepend(element);
  } else {
    container.append(element);
  }
};
