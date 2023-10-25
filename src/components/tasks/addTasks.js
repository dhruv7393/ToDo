import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


const AddTodo = (props) => {

    const { onClose, open } = props;

    const handleClose = () => {
    onClose();
    };

    const [headers, addHeaders] = useState([])
    const [todo, addTodo] = useState({
        headerId:"6536bf3ce25e5c4700b6e7b0",
        title:'',
        notes:'',
        imp:5,
        addedOn:new Date().toLocaleDateString(),
        completedOn:'',
        completeBy:'',
        done:false
    })
    const [error, setError] = useState('')

    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL + "headers")
        .then(({data}) => addHeaders(data))
        .catch(err => setError(err))
    },[])

    const addTodoToDB = ()=>{
        axios.post(process.env.REACT_APP_BACKEND_URL + "todos", todo)
        .then(data => addTodo({
            headerId:"6536bf3ce25e5c4700b6e7b0",
            title:'',
            notes:'',
            imp:5,
            addedOn:new Date().toLocaleDateString(),
            completedOn:'',
            completeBy:'',
            done:false
        }))
        .catch(err => {
            console.log(err)
            setError(err)
        })
        handleClose()
    }

    return (
        <Dialog onClose={handleClose} open={open} sx={{ m: 0, p: 2 }} id="customized-dialog-title">

            <DialogTitle>Add Todo</DialogTitle>

            <DialogContent>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Header</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={todo["headerId"]}
                    onChange={(e) => addTodo({...todo, headerId: e.target.value})}
                    label="Age"
                    >
                    {headers && headers.map(header => <MenuItem value={header._id} key={header._id}>{header.title}</MenuItem>)}
                    </Select>
                </FormControl>

                <TextField id="outlined-basic" label="Title" variant="outlined" defaultValue={todo["title"]} onChange={e => addTodo({...todo, title: e.target.value})} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Notes" variant="outlined" defaultValue={todo["notes"]} onChange={e => addTodo({...todo, notes: e.target.value})} fullWidth margin="normal"/>
                
                <Rating
                    name="Importance of 5"
                    value={todo["imp"]}
                    onChange={(event, newValue) => {
                        addTodo({...todo, imp: newValue})
                    }}
                />
                
                <TextField id="outlined-basic" label="Added On" variant="outlined" defaultValue={todo["addedOn"]} onChange={e => addTodo({...todo, addedOn: e.target.value})} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Completed On" variant="outlined" defaultValue={todo["completedOn"]} onChange={e => addTodo({...todo, completedOn: e.target.value})} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Complete By" variant="outlined" defaultValue={todo["completeBy"]} onChange={e => addTodo({...todo, completeBy: e.target.value})} fullWidth margin="normal"/>
                Done: <Switch aria-label="pinned" checked={todo.done} onClick={() =>addTodo({...todo, done: !todo.done})} />
            </DialogContent>


            <DialogActions>
                <Button variant="contained" onClick={() => addTodoToDB()}>Submit</Button>
            </DialogActions>
        
        </Dialog>
    );
}
 
export default AddTodo;