import Todos from "./components/tasks";
import React, { useEffect } from "react";
import Header from "./components/headers";
import AddTaskButton from "./components/tasks/addTaskButton";
import Inpiration from "./components/inspiration";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useHeaderState } from "./components/state/atoms/headers";
import { useError } from "./components/state/atoms/error";
import { useTaskState } from "./components/state/atoms/tasks";
import {
  getAndAddDailyTasks,
  getAndAddNonDailyTasks,
} from "./components/state/selectors/tasks";
import { getAndAddHeaders } from "./components/state/selectors/headers";
import { getAllCallLog } from "./components/state/selectors/calls";
import { useCall } from "./components/state/atoms/calls";
import DisplayDailyTask from "./components/tasks/DisplayDailyTask";
import DisplayTasks from "./components/tasks/DisplayTasks";

function App() {
  const { setHeader, setHeaderAtTop } = useHeaderState();
  const { error, setError } = useError();
  const { updateTaskList, addTasks, addTasksForToday } = useTaskState();
  const { setCall } = useCall();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "dailytask/updatecount")
      .then((data) => setError("Daily task updated"))
      .catch((err) => setError(err));

    getAndAddHeaders(setHeader, setHeaderAtTop, setError);
    getAndAddDailyTasks(updateTaskList, setError);
    getAndAddNonDailyTasks(addTasks, addTasksForToday, setError);
    getAllCallLog(setCall, setError);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 10000);
  }, [error]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="container">
          <div className="halfScreen">
            <DisplayDailyTask />
            <DisplayTasks />
          </div>
          <div className="halfScreen inspiration">
            <Inpiration />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
