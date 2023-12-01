import Todos from "./components/tasks";
import React, { useEffect } from "react";
import Header from "./components/headers";
import AddTaskButton from "./components/tasks/addTaskButton";
import Inpiration from "./components/inspiration";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { errorState } from "./components/state/atoms/error";
import { useRecoilState } from "recoil";
import Alert from "@mui/material/Alert";
import axios from "axios";

function App() {
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "dailytask/updatecount")
      .then((data) => console.log("Daily task updated"))
      .catch((err) => setError(err));
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
            {(error && <Alert severity="error">{error}</Alert>) || <></>}
            <Todos />
            <Header />
            <AddTaskButton />
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
