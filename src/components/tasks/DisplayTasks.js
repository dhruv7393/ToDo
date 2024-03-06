import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { cardBoundaryColor } from '../../style';
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Button from "@mui/material/Button";
import EditTodoNew from './editTaskNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTodoNew from './addTaskNew';

const  DisplayTasks= () => {
    const [tasks, updateTasks] = useState([])

    const [openEdit, handleOpenEdit] = useState(false)

    const [openAdd, handleOpenAdd] = useState(false)

    const [taskToBeEdited, handleTaskToBeEdited] =useState({})

    const loadData = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL + "tasks")
        .then(({data}) => {
            let newData = data.sort((a,b)=> {
                if((a.done && b.done) || (!a.done && !b.done)){
                    return b.imp-a.imp
                }else if(a.done){
                    return 1
                }else if(b.done){
                    return -1
                }else{
                    return b.imp-a.imp
                }
                })

                newData = newData.sort((a,b)=> {
                    if((a.pinned && b.pinned) || (!a.pinned && !b.pinned)){
                        return b.imp-a.imp
                    }else if(a.pinned){
                        return -1
                    }else if(b.pinned){
                        return 1
                    }else{
                        return b.imp-a.imp
                    }
                    })
            updateTasks([...newData])
        })
    }
    useEffect(()=>{
        loadData()
    },[])

    const updateDetails = (header) =>{
        axios.patch(process.env.REACT_APP_BACKEND_URL + "tasks/"+header._id, header)
        .then(data => loadData())
        .catch(err => console.log(err))
    }

    const deleteTask = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL + "tasks/"+id)
        .then(data => loadData())
        .catch(err => console.log(err))
    }

    const updateTask = (task) =>{
        task.notes = task.notes[0].split('\n')
        axios.patch(process.env.REACT_APP_BACKEND_URL + "tasks/"+task._id, task)
        .then(data=> console.log(data))
        .then(()=>loadData())
        .catch(err => console.log(err))
        handleTaskToBeEdited({})
        handleOpenEdit(false)
    }

    const addTask= (task) =>{
        handleOpenAdd(false)
        task.notes = task.notes[0].split('\n')
        axios.post(process.env.REACT_APP_BACKEND_URL + "tasks", task)
        .then(()=> loadData())
        .catch(err => loadData())
    }
    
    return ( 
        <>
            <div style={{margin:"auto", textAlign:"center"}}>
                <IconButton
                    aria-label="settings"
                    onClick={() =>
                        handleOpenAdd(true)
                    }
                >
                    <AddCircleOutlineIcon
                        color={""}
                        fontSize='large'
                    />
                </IconButton>
            </div>
            {openAdd && <AddTodoNew open={openAdd} onClose={()=>handleOpenAdd(false)} addTask={addTask}/> || <></>}
            {openEdit && <EditTodoNew open={openEdit} onClose={()=>handleOpenEdit(false)} task={taskToBeEdited} updateTask={updateTask}/> || <></>}
            <Box key={"Daily Tasks"} sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
                {(tasks.length &&
                    tasks.map((task, index) => {
                    let { _id, title, notes, imp, done, pinned } = task;
                    return (
                        <Card
                        key={"Daily" + _id}
                        sx={{
                            width: {
                            xs: "100%",
                            sm: "100%",
                            md: "46%",
                            },
                        }}
                        style={cardBoundaryColor(imp)}
                        >
                        <CardHeader
                            action={
                                <>
                                <IconButton
                                    aria-label="settings"
                                    onClick={() =>
                                        {
                                            handleTaskToBeEdited(task)
                                            handleOpenEdit(true)
                                            
                                        }
                                    }
                                >
                                    <CreateIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="settings"
                                    onClick={() =>
                                        updateDetails({...task, pinned: !pinned})
                                    }
                                >
                                    <PushPinIcon
                                        color={"" + (pinned && "primary")}
                                    />
                                </IconButton>
                                <IconButton
                                    aria-label="settings"
                                    onClick={() =>
                                        deleteTask(_id)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="settings"
                                    onClick={() =>
                                        updateDetails({...task, done: !done, pinned:false})
                                    }
                                >
                                    <CheckCircleOutlineRoundedIcon
                                        color={"" + (done && "primary")}
                                    />
                                </IconButton>
                                </>
                            }
                            
                            title={<LightTooltip title={textToBeDisplayed(notes)}> <Button>{done && <s>{title}</s> || <>{title}</>}</Button></LightTooltip>}
                        />
                        </Card>
                    );
                })) || <></>}
            </Stack>
            </Box>
        </>
     );
}

const textToBeDisplayed = (notes) =>{
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
 
export default DisplayTasks;