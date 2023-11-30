import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddTodo from "./addTasks";

const AddTaskButton = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        Add Todo
      </Button>
      <AddTodo open={open} onClose={handleClose} />
    </>
  );
};

export default AddTaskButton;
