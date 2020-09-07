import {COLORS} from "../const.js";
import {getRandomInteger, getRandomArrayItem, getRandomBoolean} from "../utils/common.js";
import {getCurrentDate} from "../utils/task.js";

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const DESCTIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MAX_DAYS_GAP = 7;

const generateDescription = () => (getRandomArrayItem(DESCTIPTIONS));

const generateDate = () => {
  const isDate = getRandomBoolean();

  if (!isDate) {
    return null;
  }

  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = getCurrentDate();
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {

  return {
    id: generateId(),
    mo: false,
    tu: false,
    we: getRandomBoolean(),
    th: false,
    fr: getRandomBoolean(),
    sa: false,
    su: false
  };
};

const getRandomColor = () => (getRandomArrayItem(COLORS));

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    id: generateId(),
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  };
};
