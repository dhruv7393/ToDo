import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddTodo from './addTasks';

const AddTaskButton = () =>{
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Todo
          </Button>
          <AddTodo
            open={open}
            onClose={handleClose}
          />
        </>
      );

}

export default AddTaskButton;