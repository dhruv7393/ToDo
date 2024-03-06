
import React, { useState } from "react";
import Inpiration from "./components/inspiration";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DisplayDailyTask from "./components/tasks/DisplayDailyTask";
import DisplayTasks from "./components/tasks/DisplayTasks";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import IconButton from "@mui/material/IconButton";
import DisplayCalls from "./components/tasks/DisplayCalls";

function App() {


  const [showCallers, setShowCallers] = useState(false)

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
            
            <div style={{margin:"auto", textAlign:"center"}}>
                <IconButton
                    aria-label="settings"
                    onClick={() =>
                      setShowCallers(!showCallers)
                    }
                >
                    <VideoCallIcon
                        color={""}
                        fontSize='large'
                    />
                </IconButton>
                {(showCallers && <DisplayCalls />) || <></>}
            </div>
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
