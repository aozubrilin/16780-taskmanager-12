import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils.js";

const countFilteredTask = (filter, check) => {
  return check ? (filter || 0) + 1 : filter || 0;
};

export const generateFilter = (tasks) => {

  const filters = tasks.reduce((filter, task) => {
    filter.all = countFilteredTask(filter.all, !task.isArchive);
    filter.overdue = countFilteredTask(filter.overdue, !task.isArchive && isTaskExpired(task.dueDate));
    filter.today = countFilteredTask(filter.today, !task.isArchive && isTaskExpiringToday(task.dueDate));
    filter.favorites = countFilteredTask(filter.favorites, !task.isArchive && task.isFavorite);
    filter.repeating = countFilteredTask(filter.repeating, !task.isArchive && isTaskRepeating(task.repeatingDays));
    filter.archive = countFilteredTask(filter.archive, task.isArchive);

    return filter;
  }, {});

  return Object.entries(filters).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks
    };
  });
};
