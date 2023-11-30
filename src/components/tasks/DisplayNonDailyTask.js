import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { avatarColor, cardBoundaryColor } from "../../style";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));

export default function DisplayNonDailyTask({
  tasks,
  header,
  deleteTask,
  markAsDone,
  markForToBeCompletedToday,
  todaysTask,
  editTask,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    console.log(!expanded);
  };

  return (
    <Box key={header} sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {Object.keys(tasks).length &&
          Object.keys(tasks).map((task) => {
            let {
              _id,
              title,
              headerId,
              notes,
              imp,
              addedOn,
              completedOn,
              completeBy,
              done,
            } = tasks[task];
            return (
              <Card
                key={_id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "40%",
                    md: "30%",
                  },
                }}
                style={cardBoundaryColor(imp)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={avatarColor(imp)} aria-label="recipe">
                      {imp}
                    </Avatar>
                  }
                  title={title}
                  subheader={header}
                />
                {(notes && (
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {notes}
                    </Typography>
                  </CardContent>
                )) || <></>}
                <CardActions disableSpacing>
                  <Typography color="text.secondary">
                    {"" +
                      (completeBy && `${completeBy} (`) +
                      Math.ceil(
                        (new Date(new Date().toLocaleDateString()) -
                          new Date(addedOn)) /
                          (1000 * 60 * 60 * 24)
                      ) +
                      (completeBy && `)`)}
                  </Typography>
                  <ExpandMore
                    expand={true}
                    onClick={() => editTask(headerId, _id)}
                  >
                    <CreateIcon />
                  </ExpandMore>
                  <ExpandMore
                    expand={true}
                    onClick={() => markForToBeCompletedToday(headerId, _id)}
                  >
                    <PushPinIcon
                      color={"" + (todaysTask.includes(_id) && "primary")}
                    />
                  </ExpandMore>
                  <ExpandMore
                    expand={true}
                    onClick={() => deleteTask(headerId, _id)}
                  >
                    <DeleteIcon />
                  </ExpandMore>
                  <ExpandMore
                    expand={true}
                    onClick={() => markAsDone(headerId, _id)}
                  >
                    <CheckCircleOutlineRoundedIcon
                      color={"" + (done && "primary")}
                    />
                  </ExpandMore>
                </CardActions>
              </Card>
            );
          })}
      </Stack>
    </Box>
  );
}
