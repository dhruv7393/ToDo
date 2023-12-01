import axios from "axios";

export const getAndAddDailyTasks = (updateTaskList, setError) => {
  axios
    .get(process.env.REACT_APP_BACKEND_URL + "dailytask")
    .then((listOfTasks) => {
      updateTaskList([...listOfTasks["data"]]);
    })
    .catch((err) => setError(err));
};

export const updateDailyTaskCount = (
  taskList,
  taskToBeUpdated,
  updateTaskList,
  setError
) => {
  axios
    .patch(
      process.env.REACT_APP_BACKEND_URL + "dailytask/" + taskToBeUpdated["_id"],
      taskToBeUpdated
    )
    .then((data) => {
      let updatedTaskList = taskList.map((task) =>
        task["_id"] === taskToBeUpdated["_id"] ? taskToBeUpdated : task
      );
      updateTaskList(updatedTaskList);
    })
    .catch((err) => setError(err));
};

export const getAndAddNonDailyTasks = (
  addTasks,
  addTasksForToday,
  setError
) => {
  const today = new Date().toLocaleDateString();
  axios
    .get(process.env.REACT_APP_BACKEND_URL + "todos")
    .then(({ data }) => {
      let organizedData = {};
      let listOfTodaysTask = {};

      data.forEach((task) => {
        if (Object.keys(organizedData).includes(task.headerId)) {
          organizedData[task.headerId] = [
            ...organizedData[task.headerId],
            task,
          ];
        } else {
          organizedData[task.headerId] = [task];
        }

        if (
          task.completeBy === today ||
          (new Date(task.completeBy) <= new Date(today) && !task.done)
        ) {
          listOfTodaysTask[task._id] = task;
        }
      });

      addTasks(organizedData);
      addTasksForToday(listOfTodaysTask);
    })
    .catch((err) => setError(err));
};

export const deleteNonDailyTask = (
  headerId,
  id,
  tasks,
  addTasks,
  tasksForToday,
  addTasksForToday,
  setError
) => {
  axios
    .delete(process.env.REACT_APP_BACKEND_URL + "todos/" + id)
    .then((data) => {
      let listOfTasks = tasks[headerId];
      listOfTasks = listOfTasks.filter((task) => task._id !== id);
      let newValue = {};
      newValue[headerId] = listOfTasks;
      listOfTasks = { ...tasks, ...newValue };
      addTasks(listOfTasks);

      listOfTasks = JSON.parse(JSON.stringify(tasksForToday));
      delete listOfTasks[id];
      addTasksForToday(listOfTasks);
    })
    .catch((err) => setError(err));
};

export const markNonDailyTaskAsDone = (
  headerId,
  id,
  tasks,
  addTasks,
  setError
) => {
  let listOfTasks = tasks[headerId];
  listOfTasks = listOfTasks.map((task) => {
    if (task._id == id) {
      task.done = !task.done;
    }
    return task;
  });
  let newValue = {};
  newValue[headerId] = listOfTasks;

  let taskToBeSent = listOfTasks.filter((task) => task._id == id);
  axios
    .patch(process.env.REACT_APP_BACKEND_URL + "todos/" + id, taskToBeSent[0])
    .then((data) => {
      listOfTasks = { ...tasks, ...newValue };
      addTasks(listOfTasks);
    })
    .catch((err) => setError(err));
};

export const updateNonDailyTask = (
  updatedtask,
  tasks,
  addTasks,
  tasksForToday,
  addTasksForToday
) => {
  const { headerId, _id } = updatedtask;
  let listOfTasks = JSON.parse(JSON.stringify(tasks));
  listOfTasks[headerId] = listOfTasks[headerId].map((task) => {
    return task._id == _id ? { ...updatedtask } : { ...task };
  });
  addTasks(listOfTasks);
  listOfTasks = JSON.parse(JSON.stringify(tasksForToday));
  let newValue = {};
  newValue[_id] = updatedtask;
  listOfTasks = { ...listOfTasks, ...newValue };

  addTasksForToday(listOfTasks);
};

export const markNonDailyForToBeCompletedToday = (
  headerId,
  id,
  tasks,
  addTasks,
  tasksForToday,
  addTasksForToday,
  setError
) => {
  const today = new Date().toLocaleDateString();
  let listOfTasks = JSON.parse(JSON.stringify(tasks[headerId]));
  listOfTasks = listOfTasks.map((task) => {
    if (task._id == id) {
      task.completeBy = task.completeBy ? "" : today;
    }
    return task;
  });
  let newValue = {};
  newValue[headerId] = listOfTasks;
  let taskToBeSent = listOfTasks.filter((task) => task._id == id);

  axios
    .patch(process.env.REACT_APP_BACKEND_URL + "todos/" + id, taskToBeSent[0])
    .then((data) => {
      listOfTasks = { ...tasks, ...newValue };
      addTasks(listOfTasks);
      listOfTasks = JSON.parse(JSON.stringify(tasksForToday));
      Object.keys(listOfTasks).includes(id)
        ? delete listOfTasks[id]
        : (listOfTasks[id] = tasks[headerId].filter(
            (task) => task._id == id
          )[0]);
      addTasksForToday(listOfTasks);
    })
    .catch((err) => setError(err));
};
