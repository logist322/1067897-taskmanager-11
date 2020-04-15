const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};

export const getRandomElementFromArray = (array) => {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};
