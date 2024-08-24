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
      let dataIndex = data.findIndex(task => task.title==="Vision")
      data.unshift(data[dataIndex])
      data.splice(dataIndex+1, 1)
      updateTaskList([...data]);
    })
    .catch((err) => console.log(err));
  }

  React.useEffect(()=>{
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "dailytask/updatecount")
      .then((data) => {})
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
            let { _id, title, done, edited, pending } = task;
            if(title==="Vision" || pending<0){
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
                      pending < 0 && <IconButton
                          aria-label="settings"
                          onClick={() =>
                            markAsChecked({
                              _id,
                              title,
                              done: pending >= 0 ? true : false,
                              edited,
                              pending: pending +1
                            })
                          }
                        >
                          <AddCircleOutlineIcon
                            color={""}
                          />
                        </IconButton> || <></>
                    }
                    avatar={
                      <Avatar sx={pending <0 ?avatarColor(5):avatarColor(1)} aria-label="recipe">
                        {Math.abs(pending)}
                      </Avatar>
                    }
                    title={title==="Goon"? <LightTooltip title={textToBeDisplayed(pending, edited)}> <Button>{title}</Button></LightTooltip> : title}
                  />
                </Card>
              );
            }else{
              return <></>
            }
              
          })) || <></>}
      </Stack>
    </Box>
  );
}

const textToBeDisplayed = (pending, edited) =>{
  const goono = ["Sahaj uncle","Kishanji","Chirag bhai","Aashish bhai","Jigar bhai","Tejal bhabhi","Vinay bhai","Riddhi ben","Jamshedji tata - dilip kumar","Jayant uncle","Lalit uncle","Yash bhai","Miral bhai","Vivek bhai","Hetal ben","Prashant bhai","Rupal bhabhi","Viru bhai","Malav bhai","Hardik bhai","Dharti ben","Yogin bhai","Manmeet bhai","Mayank bhai","Ankur bhai","Rahul bhai","Meet bhai","Satish bhai","Harsh bhai","Kesin bhai","Aashish bhai","Shail bhai","Raghav bhai","Rishabh bhai","Rujool bhai","Deep bhai","Ujval bhai","Advait bhai","Ruchit bhai kadakiya","Amit bhai","Jaymin bhai","Vrund bhai","Jaydeep bhai","Jaymin bhai pickup","Jay bhai la","Mayur bhai","Nipun bhai","Grinish bhai","Sujeet bhai","Rahul bhai sf/canada","Gokul bhai","Jignesh bhai","Manan bhai","Spandan bhai","Daddy","Alpesh bhai","Shasvat bhai","Anmol bhai","Sneha bhabhi","Dhruvalbhai","Nisarg bhai","Aashish bhai Pandya","Sarvam bhai dr","Punyesh bhai","Yash bhai Boston","Deep bhai reno","Bhargav bhai reno","Darshan bhai reno","Vivek bhai fresno","Ronak bhai","Dr.saheb","Jimit bhai","Divyang bhai","Priyank bhai","Jal bhai","Anil bhai","Milan bhai nj","Jay bhai paji","Dhrumil bhai vora","Kirit bhai","Divyesh bhai","Sashank bhai","Purvadarshan bhai","Ambrish bhai","Sukumar bhai","Sarvam swami bus 500 bus","Jugal bhai","Gaurav bhai","Manthan bhai","Krutarth bhai","Kunj bhai","Milind bhai","Harbir Bhai Protek","Sambhav bhai Protek","Dhruvbhai Patel texas","Maa","Papa","Satish papa","Mona mummy","Priyank jiju","Disha didi","Mauli","Payal didi","Ram","Shubham","Bhavana","Dominique","Arpit","Vivek","Mini"]

  let valueToBeCalculated = Math.ceil(
    (new Date(edited) - new Date('5/1/2024') + ((pending+7)* 1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60 * 24)
  )%22

  let value = (valueToBeCalculated%(goono.length/5)) < 0? 0 : (valueToBeCalculated%(goono.length/5))
  let notes = (goono.slice((value)*5, (value*5)+5))

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