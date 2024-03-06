import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { cardBoundaryColor } from "../../style";
import { useError } from "../state/atoms/error";
import axios from "axios";

export default function DisplayCalls(props) {
  const [call, setCall ] = React.useState([]);
  const { setError } = useError();

  const loadCalls = () =>{
    axios
    .get(process.env.REACT_APP_BACKEND_URL + "call")
    .then(({ data }) => {
      data.sort((a, b) => (a.done | 0) - (b.done | 0));
      setCall(data);
    })
    .catch((err) => console.log(err));
  }

  React.useEffect(()=>{
    loadCalls()
  }, [])

  const updateCallLog = (newCallValue) => {
    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL + "call/" + newCallValue._id,
        newCallValue
      )
      .then((data) => loadCalls())
      .catch((err) => console.log(err));
  };

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
                    md: "30%",
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
                          {_id, title, done: !done }
                        );
                      }}
                    />
                  }
                  title={<div>{title}</div>}
                />
              </Card>
            );
          })) || <></>}
      </Stack>
    </Box>
  );
}
