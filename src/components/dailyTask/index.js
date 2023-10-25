import { useState, useEffect } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';


const DailyTask = () =>{
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

    return(
        <>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Daily Tasks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {taskList.length && taskList.map(task => {
                        let {_id, title, done} = task
                        let label = { inputProps: { 'aria-label': title } };
                        return(
                            <div key={_id}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>{title}</Grid>
                                    <Grid item xs={9}><Switch {...label} checked={done} onClick={() =>markAsChecked({_id, title, done: !done})} /></Grid>
                                </Grid>
                            </div>
                        )
                    })}
                </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )

}

export default DailyTask;