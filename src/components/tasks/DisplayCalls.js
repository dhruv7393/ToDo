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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTaskState } from "../state/atoms/tasks";
import { useError } from "../state/atoms/error";
import { updateDailyTaskCount } from "../state/selectors/tasks";
import { useCall } from "../state/atoms/calls";
import { updateCallLog } from "../state/selectors/calls";

export default function DisplayCalls(props) {
  const { call, setCall } = useCall();
  const { setError } = useError();

  return (
    <Box key={"Calls"} sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
      <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
        {(call.length &&
          call.map((task) => {
            let { _id, title, done } = task;
            return (
              <Card
                key={_id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "40%",
                    md: "20%",
                  },
                }}
                style={cardBoundaryColor(5)}
              >
                <CardHeader
                  action={
                    <CheckCircleOutlineRoundedIcon
                      color={"" + (done && "primary")}
                      onClick={() => {
                        updateCallLog(
                          { _id, title, done: !done },
                          call,
                          setCall,
                          setError
                        );
                      }}
                    />
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
