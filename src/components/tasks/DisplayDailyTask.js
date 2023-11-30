import * as React from "react";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { cardBoundaryColor } from "../../style";
import { useRecoilState } from "recoil";
import { errorState } from "../error";
import { avatarColor } from "../../style";
import Avatar from "@mui/material/Avatar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));

export default function DisplayDailyTask(props) {
  const [taskList, updateTaskList] = useState([]);
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "dailytask")
      .then((listOfTasks) => updateTaskList(listOfTasks["data"]))
      .catch((err) => setError(err));
  }, []);

  const markAsChecked = (taskToBeUpdated) => {
    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL +
          "dailytask/" +
          taskToBeUpdated["_id"],
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

  return (
    <Box key={"Daily Tasks"} sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {taskList.length &&
          taskList.map((task) => {
            let { _id, title, done, edited, pending } = task;
            return (
              <Card
                key={_id}
                sx={{
                  width: {
                    sm: "100%",
                    md: "30%",
                  },
                }}
                style={cardBoundaryColor(5)}
              >
                <CardHeader
                  action={
                    (!parseInt(pending) && <></>) || (
                      <IconButton
                        aria-label="settings"
                        onClick={() =>
                          markAsChecked({
                            _id,
                            title,
                            done: pending == "1" ? !done : done,
                            edited,
                            pending: (parseInt(pending) - 1 < 0
                              ? 0
                              : parseInt(pending) - 1
                            ).toString(),
                          })
                        }
                      >
                        <RemoveCircleOutlineIcon
                          color={"" + (!parseInt(pending) && "primary")}
                        />
                      </IconButton>
                    )
                  }
                  avatar={
                    <Avatar sx={avatarColor(5)} aria-label="recipe">
                      {pending}
                    </Avatar>
                  }
                  title={title}
                />
              </Card>
            );
          })}
      </Stack>
    </Box>
  );
}
