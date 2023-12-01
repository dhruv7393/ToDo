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
