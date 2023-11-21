import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import DisplayNonDailyTask from './DisplayNonDailyTask';
import EditTodo from './editTask';
import DisplayDailyTask from "./DisplayDailyTask"
import { buttonGroup } from '../../style';

const Todos = () => {
    
  const [headers, addHeaders] = useState({})
  const [headersAtTop, addHeadersAtTop] = useState({})
  const [tasks, addTasks] = useState({})
  const [tasksForToday, addTasksForToday] = useState({})
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false);
  const [taskToBeEdited, setTaskToBeEdited] = useState({})
  const [viewHeader, setViewHeader] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskToBeEdited({})
    };

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
           if(Object.keys(organizedData).includes(task.headerId)){
            organizedData[task.headerId] = [...organizedData[task.headerId], task]
           }else{
            organizedData[task.headerId] = [task]
           }

            if((task.completeBy === today) || ( new Date(task.completeBy) <= new Date(today) && !task.done)){
                listOfTodaysTask[task._id] = task
            }
        })
        addTasks(organizedData)
        addTasksForToday(listOfTodaysTask)
    })
    .catch(err => setError(err))
  },[])

  const deleteTask = (headerId, id) => {
    axios.delete(process.env.REACT_APP_BACKEND_URL + "todos/"+id)
    .then(data => {
        let listOfTasks =tasks[headerId]
        listOfTasks = listOfTasks.filter(task => task._id !== id)
        let newValue = {}
        newValue[headerId] = listOfTasks
        listOfTasks = {...tasks, ...newValue}
        addTasks(listOfTasks)
        
        listOfTasks = JSON.parse(JSON.stringify(tasksForToday))
        delete listOfTasks[id]
        addTasksForToday(listOfTasks)
    })
    .catch(err => setError(err))
  }

  const markAsDone = (headerId, id)=>{
    let listOfTasks =tasks[headerId]
    listOfTasks = listOfTasks.map(task => {
        if(task._id == id){task.done = !task.done}
        return task
    })
    let newValue = {}
    newValue[headerId] = listOfTasks

    let taskToBeSent = listOfTasks.filter(task => task._id == id)
    axios.patch(process.env.REACT_APP_BACKEND_URL + "todos/"+id, taskToBeSent[0])
    .then(data => {
        listOfTasks = {...tasks, ...newValue}
        addTasks(listOfTasks)
    })
    .catch(err => setError(err))
  }

  const markForToBeCompletedToday = (headerId, id) =>{
    const today = new Date().toLocaleDateString()
    let listOfTasks = JSON.parse(JSON.stringify(tasks[headerId]))
    listOfTasks = listOfTasks.map(task => {
        if(task._id == id){task.completeBy = (task.completeBy ? '' : today)}
        return task
    })
    let newValue = {}
    newValue[headerId] = listOfTasks
    let taskToBeSent = listOfTasks.filter(task => task._id == id)


    axios.patch(process.env.REACT_APP_BACKEND_URL + "todos/"+id, taskToBeSent[0])
    .then(data => {
        listOfTasks = {...tasks, ...newValue}
        addTasks(listOfTasks)
        listOfTasks = JSON.parse(JSON.stringify(tasksForToday))
        Object.keys(listOfTasks).includes(id) ? delete listOfTasks[id] : listOfTasks[id]=tasks[headerId].filter(task => task._id == id)[0]
        addTasksForToday(listOfTasks)
    })
    .catch(err => setError(err))

  }

  const editTask = (headerId, id) =>{
    let listOfTasks = tasks[headerId].filter(task => task._id == id)
    setTaskToBeEdited(listOfTasks[0])
    setOpen(true)
  }

  const updateTask = (updatedtask) =>{
    const {headerId, _id} = updatedtask
    let listOfTasks = JSON.parse(JSON.stringify(tasks))
    listOfTasks[headerId] = listOfTasks[headerId].map(task =>{
        return (task._id == _id ? {...updatedtask} : {...task})
    })
    addTasks(listOfTasks)
    listOfTasks = JSON.parse(JSON.stringify(tasksForToday))
    let newValue = {}
    newValue[_id] = updatedtask
    listOfTasks = {...listOfTasks, ...newValue}

    addTasksForToday(listOfTasks)
  }

  /*
  const birthday = new Date(2026, 11, 17).toLocaleDateString();
  const today = new Date().toLocaleDateString()
  console.log( new Date(birthday) <  new Date(today))
  */

  //Keep task for today at top
  //Keep pinned headers next
  //Keep normal headers next


  return ( 
    <>
        <div>
            <DisplayDailyTask />
            {Object.keys(taskToBeEdited).length ?
            <EditTodo
                open={open}
                onClose={handleClose}
                task={taskToBeEdited}
                updateTask={updateTask}
            />:
            <></>
            }
            <DisplayNonDailyTask tasks={tasksForToday} header="Tasks For Today" deleteTask={deleteTask} markAsDone={markAsDone} markForToBeCompletedToday={markForToBeCompletedToday} todaysTask={Object.keys(tasksForToday)} editTask={editTask}/>
            
            <ButtonGroup variant="text" aria-label="outlined button group" style={buttonGroup}>
                {Object.keys(headersAtTop).length && Object.keys(headersAtTop).map(header => {
                    return(
                        (!Object.keys(tasks).includes(header) && <></>) ||
                        <Button disabled ={(viewHeader==header ? true : false)} onClick={()=>setViewHeader(header)}>{headersAtTop[header].title}</Button>
                    )
                })}
                {Object.keys(headers).length && Object.keys(headers).map(header => {
                    return(
                        (!Object.keys(tasks).includes(header) && <></>) ||
                        <Button disabled ={(viewHeader==header ? true : false)} onClick={()=>setViewHeader(header)}>{headers[header].title}</Button>
                    )
                })}
            </ButtonGroup>
            {Object.keys(headersAtTop).length && Object.keys(headersAtTop).map(headerId => {
                return(
                    (headerId !== viewHeader && <></>)||
                    <>
                        {tasks[headerId] && <DisplayNonDailyTask tasks={tasks[headerId]} header={headersAtTop[headerId].title} deleteTask={deleteTask} markAsDone={markAsDone} markForToBeCompletedToday={markForToBeCompletedToday} todaysTask={Object.keys(tasksForToday)} editTask={editTask}/>}
                    </>
                )
            })}
            {Object.keys(headers).length && Object.keys(headers).map(headerId => {
                return(
                    (headerId !== viewHeader && <></>)||
                    <>
                        {tasks[headerId] && <DisplayNonDailyTask tasks={tasks[headerId]} header={headers[headerId].title} deleteTask={deleteTask} markAsDone={markAsDone} markForToBeCompletedToday={markForToBeCompletedToday} todaysTask={Object.keys(tasksForToday)} editTask={editTask}/>}
                    </>
                )
            })}
        </div>
    </>
   );
}
 
export default Todos;