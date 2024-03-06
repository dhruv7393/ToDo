import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { cardBoundaryColor } from "../../style";
import { avatarColor } from "../../style";
import Avatar from "@mui/material/Avatar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Button from "@mui/material/Button";

export default function DisplayDailyTask(props) {
  const [taskList, updateTaskList] = React.useState([]);

  

  const loadTasks = () =>{
    axios
    .get(process.env.REACT_APP_BACKEND_URL + "dailytask")
    .then(({data}) => {
      updateTaskList([...data]);
    })
    .catch((err) => console.log(err));
  }

  React.useEffect(()=>{
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "dailytask/updatecount")
      .then((data) => console.log("Daily task updated"))
      .then(()=> loadTasks())
      .catch((err) => console.log(err));
  },[])

  const markAsChecked = (taskToBeUpdated) => {
    axios
    .patch(
      process.env.REACT_APP_BACKEND_URL + "dailytask/" + taskToBeUpdated["_id"],
      taskToBeUpdated
    )
    .then((data) => loadTasks())
    .catch((err) => console.log(err));
  };

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
                              done: pending == 1 ? true : false,
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
                    title={title==="Goon"? <LightTooltip title={textToBeDisplayed(pending, surplus)}> <Button>{title}</Button></LightTooltip> : title}
                  />
                </Card>
              );
          })) || <></>}
      </Stack>
    </Box>
  );
}

const textToBeDisplayed = (pending, surplus) =>{
  const goono = ["Sahaj uncle","Kishanji","Chirag bhai","Aashish bhai","Jigar bhai","Tejal bhabhi","Vinay bhai","Riddhi ben","Jamshedji tata - dilip kumar","Jayant uncle","Lalit uncle","Yash bhai","Miral bhai","Vivek bhai","Hetal ben","Prashant bhai","Rupal bhabhi","Viru bhai","Malav bhai","Hardik bhai","Dharti ben","Yogin bhai","Manmeet bhai","Mayank bhai","Ankur bhai","Rahul bhai","Meet bhai","Satish bhai","Harsh bhai","Kesin bhai","Aashish bhai","Shail bhai","Raghav bhai","Rishabh bhai","Rujool bhai","Deep bhai","Ujval bhai","Advait bhai","Ruchit bhai kadakiya","Amit bhai","Jaymin bhai","Vrund bhai","Jaydeep bhai","Jaymin bhai pickup","Jay bhai la","Mayur bhai","Nipun bhai","Grinish bhai","Sujeet bhai","Rahul bhai sf/canada","Gokul bhai","Jignesh bhai","Manan bhai","Spandan bhai","Daddy","Alpesh bhai","Shasvat bhai","Anmol bhai","Sneha bhabhi","Dhruvalbhai","Nisarg bhai","Aashish bhai Pandya","Sarvam bhai dr","Punyesh bhai","Yash bhai Boston","Deep bhai reno","Bhargav bhai reno","Darshan bhai reno","Vivek bhai fresno","Ronak bhai","Dr.saheb","Jimit bhai","Divyang bhai","Priyank bhai","Jal bhai","Anil bhai","Milan bhai nj","Jay bhai paji","Dhrumil bhai vora","Kirit bhai","Divyesh bhai","Sashank bhai","Purvadarshan bhai","Ambrish bhai","Sukumar bhai","Sarvam swami bus 500 bus","Jugal bhai","Gaurav bhai","Manthan bhai","Krutarth bhai","Kunj bhai","Milind bhai","Harbir Bhai Protek","Sambhav bhai Protek","Dhruvbhai Patel texas","Maa","Papa","Satish papa","Mona mummy","Priyank jiju","Disha didi","Mauli","Payal didi","Ram","Shubham","Bhavana","Dominique","Arpit","Vivek","Mini"]

  let valueToBeCalculated = ((Math.ceil(
    (new Date(new Date().toLocaleDateString()) - new Date('3/4/2024')) /
      (1000 * 60 * 60 * 24)
  )) -(pending -1) + surplus)%22
  console.log(valueToBeCalculated)
  let value = (valueToBeCalculated%(goono.length/5)) < 1? 1 : (valueToBeCalculated%(goono.length/5))
  let notes = (goono.slice((value-1)*5, (value*5)))
  return (
      <>
          {
              notes.length && notes.map(note => {
                  return (<>{note} <br/></>)
              })|| <></>
          }
      </>
  )
  }


  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));