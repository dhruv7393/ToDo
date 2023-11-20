import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Chip from '@mui/material/Chip';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto'
}));

export default function DisplayDailyTask(props) {

    const [taskList, updateTaskList] = useState([])
    const [error, setError] = useState('')

    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL + "dailytask")
        .then(listOfTasks => updateTaskList(listOfTasks["data"]))
        .catch(err => setError(err))
    },[])

    useEffect(()=>{
        setTimeout(() => {
            setError('')
        }, 10000);
    }, [error])


    const markAsChecked = taskToBeUpdated =>{
        axios.patch(process.env.REACT_APP_BACKEND_URL + "dailytask/"+taskToBeUpdated["_id"], taskToBeUpdated)
        .then(data => {
            let updatedTaskList = taskList.map(task => task["_id"] === taskToBeUpdated["_id"]? taskToBeUpdated : task)
            updateTaskList(updatedTaskList)
        })
        .catch(err => setError(err))
    }
  
  return (
    <Box key={"Daily Tasks"} sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            {taskList.length && taskList.map(task =>{
                let {_id, title, done} = task
                return(
                    <Card key={_id} sx={{ width: '30%' }} style={{ border: "1px solid #E37239", borderLeft: "15px solid #E37239" }}>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings" onClick={() => markAsChecked({_id, title, done: !done})}>
                                  <CheckCircleOutlineRoundedIcon  color = {"" + (done && 'primary')}/>
                                </IconButton>
                              }
                            title={title}
                        />
                    </Card>
                )
            })}
        </Stack>
    </Box>
  );
}
