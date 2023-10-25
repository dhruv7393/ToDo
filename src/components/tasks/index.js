import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const Todos = () => {
    
  const [headers, addHeaders] = useState({})
  const [headersAtTop, addHeadersAtTop] = useState({})
  const [tasks, addTasks] = useState({})
  const [tasksForToday, addTasksForToday] = useState({})
  const [error, setError] = useState('')

  useEffect(()=>{
    axios.get(process.env.REACT_APP_BACKEND_URL + "headers")
    .then(({data}) => {
        let listOfHeaders = {}
        let listOfHeadersAtTop = {}
        
        data.forEach(header => {
            if(header["pinned"]){
                listOfHeadersAtTop[header["_id"]]= {
                    "title":header["title"],
                    "pinned":header["pinned"]
                }
            }else{
                listOfHeaders[header["_id"]]= {
                    "title":header["title"],
                    "pinned":header["pinned"]
                }
            }
        });
        addHeadersAtTop(listOfHeadersAtTop)
        addHeaders(listOfHeaders)
    })
    .catch(err => setError(err))
  },[])

  
  useEffect(()=>{

    const today = new Date().toLocaleDateString()
    axios.get(process.env.REACT_APP_BACKEND_URL + "todos")
    .then(({data}) => {
        let organizedData = {}
        let listOfTodaysTask={}
        data.forEach(task =>{
            organizedData[task._id] = task
            if((task.completeBy === today) || ( new Date(task.completeBy) <= new Date(today) && !task.done)){
                listOfTodaysTask[task._id] = task
            }
        })
        addTasks(organizedData)
        addTasksForToday(listOfTodaysTask)
    })
    .catch(err => setError(err))
  },[])

  const deleteTask = id => {
    axios.delete(process.env.REACT_APP_BACKEND_URL + "todos/"+id)
    .then(data => {
        let listOfTasks = JSON.parse(JSON.stringify(tasks))
        delete listOfTasks[id]
        addTasks(listOfTasks)
        listOfTasks = JSON.parse(JSON.stringify(tasksForToday))
        delete listOfTasks[id]
        addTasksForToday(listOfTasks)
    })
    .catch(err => setError(err))
  }

  const editTask = (id, e, keyName) =>{
    let listOfTasks = JSON.parse(JSON.stringify(tasks))
    listOfTasks[id][keyName] = e.target.value
    addTasks(listOfTasks)

    if(Object.keys(tasksForToday).includes(id)){
        listOfTasks = JSON.parse(JSON.stringify(tasksForToday))
        listOfTasks[id][keyName] = e.target.value
        addTasksForToday(listOfTasks)
    }
  }

  const markAsDone = (id, value, keyName)=>{
    let listOfTasks = JSON.parse(JSON.stringify(tasks))
    listOfTasks[id][keyName] = value
    addTasks(listOfTasks)

    if(Object.keys(tasksForToday).includes(id)){
        listOfTasks = JSON.parse(JSON.stringify(tasksForToday))
        listOfTasks[id][keyName] = value
        addTasksForToday(listOfTasks)
    }
  }

  const saveChanges = (id) =>{
    axios.patch(process.env.REACT_APP_BACKEND_URL + "todos/"+id, tasks[id])
    .then(data => console.log(data))
    .catch(err => setError(err))
  }
  
  /*
  const birthday = new Date(2026, 11, 17).toLocaleDateString();
  const today = new Date().toLocaleDateString()
  console.log( new Date(birthday) <  new Date(today))
  */

  //Keep task for today at top
  //Keep pinned headers next
  //Keep normal headers next

  const renderHeaderWithTodo = (headerList, headerId, taskList) =>{
    return(
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>{headerList[headerId].title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <div key={headerId}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}><b>ToDo</b></Grid>
                            <Grid item xs={3}><b>Notes</b></Grid>
                            <Grid item xs={1}><b>Priority</b></Grid>
                            <Grid item xs={1}><b>Added On</b></Grid>
                            <Grid item xs={1}><b>Completed On</b></Grid>
                            <Grid item xs={1}><b>Complete By</b></Grid>
                            <Grid item xs={1}><b>Completed</b></Grid>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={0.5}></Grid>
                        </Grid>
                    </div>
                    {Object.keys(taskList).length && Object.keys(taskList).map(id => {
                        if(taskList[id]["headerId"] == headerId){
                            let {title, notes, imp, addedOn, completedOn, completeBy, done} = taskList[id]
                            let label = { inputProps: { 'aria-label': title } };
                            return(
                                <div key={id}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}><TextField id="outlined-basic" value={title} size="small" fullWidth onChange={(e)=>editTask(id, e, "title")}/></Grid>
                                        <Grid item xs={3}><TextField id="outlined-basic" value={notes} size="small" fullWidth onChange={(e)=>editTask(id, e, "notes")}/></Grid>
                                        <Grid item xs={1}>
                                            <Rating
                                                name="Importance of 5"
                                                value={imp}
                                                onChange={(e)=>editTask(id, e, "imp")}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>{addedOn}</Grid>
                                        <Grid item xs={1}><TextField id="outlined-basic" value={completedOn} size="small" onChange={(e)=>editTask(id, e, "completedOn")}/></Grid>
                                        <Grid item xs={1}><TextField id="outlined-basic" value={completeBy} size="small" onChange={(e)=>editTask(id, e, "completeBy")}/></Grid>
                                        <Grid item xs={1}><Switch {...label} checked={done} onChange={(e)=>markAsDone(id, !done, "done")}/></Grid>
                                        <Grid item xs={0.5}><SaveIcon onClick={()=>saveChanges(id)}/></Grid>
                                        <Grid item xs={0.5}><DeleteIcon onClick={()=>deleteTask(id)}/></Grid>
                                    </Grid>
                                </div>
                            )
                        }
                    })}
                </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
  }


  return ( 
    <>
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>List Of Task for today</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><b>ToDo</b></Grid>
                        <Grid item xs={3}><b>Notes</b></Grid>
                        <Grid item xs={1}><b>Priority</b></Grid>
                        <Grid item xs={1}><b>Added On</b></Grid>
                        <Grid item xs={1}><b>Completed On</b></Grid>
                        <Grid item xs={1}><b>Complete By</b></Grid>
                        <Grid item xs={1}><b>Completed</b></Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    {Object.keys(tasksForToday).length && Object.keys(tasksForToday).map(id => {
                        let {title, notes, imp, addedOn, completedOn, completeBy, done} = tasksForToday[id]
                        let label = { inputProps: { 'aria-label': title } };
                        return(
                            <div key={id}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}><TextField id="outlined-basic" value={title} size="small" fullWidth onChange={(e)=>editTask(id, e, "title")}/></Grid>
                                    <Grid item xs={3}><TextField id="outlined-basic" value={notes} size="small" fullWidth onChange={(e)=>editTask(id, e, "notes")}/></Grid>
                                    <Grid item xs={1}>
                                        <Rating
                                            name="Importance of 5"
                                            value={imp}
                                            onChange={(e)=>editTask(id, e, "imp")}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>{addedOn}</Grid>
                                    <Grid item xs={1}><TextField id="outlined-basic" value={completedOn} size="small" onChange={(e)=>editTask(id, e, "completedOn")}/></Grid>
                                    <Grid item xs={1}><TextField id="outlined-basic" value={completeBy} size="small" onChange={(e)=>editTask(id, e, "completeBy")}/></Grid>
                                    <Grid item xs={1}><Switch {...label} checked={done} onChange={(e)=>markAsDone(id, !done, "done")}/></Grid>
                                    <Grid item xs={0.5}><SaveIcon onClick={()=>saveChanges(id)}/></Grid>
                                    <Grid item xs={0.5}><DeleteIcon onClick={()=>deleteTask(id)}/></Grid>
                                </Grid>
                            </div>
                        )
                    })}
                </Typography>
                </AccordionDetails>
            </Accordion>
        </div>

        {
            Object.keys(headersAtTop).length && Object.keys(headersAtTop).map(headerId => renderHeaderWithTodo(headersAtTop, headerId, tasks))
        }

        {
            Object.keys(headers).length && Object.keys(headers).map(headerId => renderHeaderWithTodo(headers, headerId, tasks))
        }
    </>
   );
}
 
export default Todos;