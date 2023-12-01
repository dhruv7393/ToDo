import { atom, useRecoilState } from "recoil";

const initialState = {};

export const tasksState = atom({
  key: "tasks",
  default: initialState,
});

export const tasksForTodayState = atom({
  key: "tasksForToday",
  default: initialState,
});

export const taskListState = atom({
  key: "taskList",
  default: [],
});

export const useTaskState = () => {
  const [tasks, addTasks] = useRecoilState(tasksState);
  const [tasksForToday, addTasksForToday] = useRecoilState(tasksForTodayState);
  const [taskList, updateTaskList] = useRecoilState(tasksState);
  return {
    tasks,
    addTasks,
    tasksForToday,
    addTasksForToday,
    taskList,
    updateTaskList,
  };
};
