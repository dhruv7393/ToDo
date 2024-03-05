import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { cardBoundaryColor } from "../../style";
import { avatarColor } from "../../style";
import Avatar from "@mui/material/Avatar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTaskState } from "../state/atoms/tasks";
import { useError } from "../state/atoms/error";
import { updateDailyTaskCount } from "../state/selectors/tasks";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));

export default function DisplayDailyTask(props) {
  const { taskList, updateTaskList } = useTaskState();
  const { error, setError } = useError();

  const markAsChecked = (taskToBeUpdated) => {
    updateDailyTaskCount(taskList, taskToBeUpdated, updateTaskList, setError);
  };

  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box key={"Daily Tasks"} sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
      <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
        {(taskList.length &&
          taskList.map((task) => {
            let { _id, title, done, edited, pending, surplus } = task;
              return (
                <Card
                  key={"Daily" + _id}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "40%",
                      md: "30%",
                    },
                  }}
                  style={cardBoundaryColor(5)}
                >
                  <CardHeader
                    action={
                      <IconButton
                          aria-label="settings"
                          onClick={() =>
                            markAsChecked({
                              _id,
                              title,
                              done: pending == "1" ? !done : done,
                              edited,
                              pending: pending > 0 ? pending -1 :0,
                              surplus: pending > 0 ? surplus : surplus+1,
                            })
                          }
                        >
                          {pending > 0  && <RemoveCircleOutlineIcon
                            color={"" + (!parseInt(pending) && "primary")}
                          /> || <AddCircleOutlineIcon
                            color={""}
                          />}
                        </IconButton>
                    }
                    avatar={
                      <>
                      {pending && <Avatar sx={avatarColor(5)} aria-label="recipe">
                        {pending}
                      </Avatar> || <></>}
                      {(surplus || pending==0) && <Avatar sx={avatarColor(1)} aria-label="recipe">
                        {surplus}
                      </Avatar> || <></>}</>
                    }
                    title={title}
                  />
                </Card>
              );
          })) || <></>}
      </Stack>
    </Box>
  );
}
