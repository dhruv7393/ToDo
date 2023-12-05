import React, { useState } from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import DisplayNonDailyTask from "./DisplayNonDailyTask";
import EditTodo from "./editTask";
import DisplayDailyTask from "./DisplayDailyTask";
import { buttonGroup } from "../../style";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHeaderState } from "../state/atoms/headers";
import { useError } from "../state/atoms/error";
import { useTaskState } from "../state/atoms/tasks";
import {
  deleteNonDailyTask,
  markNonDailyTaskAsDone,
  updateNonDailyTask,
  markNonDailyForToBeCompletedToday,
} from "../state/selectors/tasks";
import DisplayCalls from "./DisplayCalls";

const Todos = () => {
  const { header, headerAtTop } = useHeaderState();
  const { setError } = useError();
  const { tasks, addTasks, tasksForToday, addTasksForToday } = useTaskState();

  const [open, setOpen] = useState(false);
  const [taskToBeEdited, setTaskToBeEdited] = useState({});
  const [viewHeader, setViewHeader] = useState("");

  const handleClose = () => {
    setOpen(false);
    setTaskToBeEdited({});
  };

  const deleteTask = (headerId, id) => {
    deleteNonDailyTask(
      headerId,
      id,
      tasks,
      addTasks,
      tasksForToday,
      addTasksForToday,
      setError
    );
  };

  const markAsDone = (headerId, id) => {
    markNonDailyTaskAsDone(headerId, id, tasks, addTasks, setError);
  };

  const markForToBeCompletedToday = (headerId, id) => {
    markNonDailyForToBeCompletedToday(
      headerId,
      id,
      tasks,
      addTasks,
      tasksForToday,
      addTasksForToday,
      setError
    );
  };

  const editTask = (headerId, id) => {
    let listOfTasks = tasks[headerId].filter((task) => task._id === id);
    setTaskToBeEdited(listOfTasks[0]);
    setOpen(true);
  };

  const updateTask = (updatedtask) => {
    updateNonDailyTask(
      updatedtask,
      tasks,
      addTasks,
      tasksForToday,
      addTasksForToday
    );
  };

  /*
  const birthday = new Date(2026, 11, 17).toLocaleDateString();
  const today = new Date().toLocaleDateString()
  console.log( new Date(birthday) <  new Date(today))
  */

  //Keep task for today at top
  //Keep pinned header next
  //Keep normal header next

  const matches = useMediaQuery("(min-width:900px)");

  return (
    <>
      <div>
        <DisplayDailyTask />
        {Object.keys(taskToBeEdited).length ? (
          <EditTodo
            open={open}
            onClose={handleClose}
            task={taskToBeEdited}
            updateTask={updateTask}
          />
        ) : (
          <></>
        )}
        <DisplayNonDailyTask
          tasks={tasksForToday}
          header="Tasks For Today"
          deleteTask={deleteTask}
          markAsDone={markAsDone}
          markForToBeCompletedToday={markForToBeCompletedToday}
          todaysTask={Object.keys(tasksForToday)}
          editTask={editTask}
        />
        <ButtonGroup
          variant="text"
          aria-label="outlined button group"
          style={buttonGroup}
          orientation={`${matches ? `horizontal` : `vertical`}`}
        >
          <Button
            disabled={viewHeader === "Call" ? true : false}
            onClick={() => setViewHeader("Call")}
          >
            Call
          </Button>
          {Object.keys(headerAtTop).length &&
            Object.keys(headerAtTop).map((headerId) => {
              return (
                (!Object.keys(tasks).includes(headerId) && <></>) || (
                  <Button
                    disabled={viewHeader === headerId ? true : false}
                    onClick={() => setViewHeader(headerId)}
                    key={headerId}
                  >
                    {headerAtTop[headerId].title}
                  </Button>
                )
              );
            })}
          {Object.keys(header).length &&
            Object.keys(header).map((headerId) => {
              return (
                (!Object.keys(tasks).includes(headerId) && <></>) || (
                  <Button
                    disabled={viewHeader === headerId ? true : false}
                    onClick={() => setViewHeader(headerId)}
                    key={headerId}
                  >
                    {header[headerId].title}
                  </Button>
                )
              );
            })}
        </ButtonGroup>
        {Object.keys(headerAtTop).length &&
          Object.keys(headerAtTop).map((headerId) => {
            return (
              (headerId !== viewHeader && <></>) || (
                <>
                  {tasks[headerId] && (
                    <DisplayNonDailyTask
                      tasks={tasks[headerId]}
                      header={headerAtTop[headerId].title}
                      deleteTask={deleteTask}
                      markAsDone={markAsDone}
                      markForToBeCompletedToday={markForToBeCompletedToday}
                      todaysTask={Object.keys(tasksForToday)}
                      editTask={editTask}
                    />
                  )}
                </>
              )
            );
          })}
        {Object.keys(header).length &&
          Object.keys(header).map((headerId) => {
            return (
              (headerId !== viewHeader && <></>) || (
                <>
                  {tasks[headerId] && (
                    <DisplayNonDailyTask
                      tasks={tasks[headerId]}
                      header={header[headerId].title}
                      deleteTask={deleteTask}
                      markAsDone={markAsDone}
                      markForToBeCompletedToday={markForToBeCompletedToday}
                      todaysTask={Object.keys(tasksForToday)}
                      editTask={editTask}
                    />
                  )}
                </>
              )
            );
          })}
        {(viewHeader === "Call" && <DisplayCalls />) || <></>}
      </div>
    </>
  );
};

export default Todos;
