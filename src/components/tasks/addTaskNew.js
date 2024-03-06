import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const AddTodoNew = ({ onClose, open, addTask }) => {
  const handleClose = () => {
    onClose();
  };

  const [todo, addTodo] = useState({ 
    title:"",
    notes:[""],
    imp:1,
    done:false,
    pinned:false
  });

  return (
    (open && (
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
      >
        <DialogTitle>Good Luck!</DialogTitle>

        <DialogContent>

          <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              defaultValue={todo["title"]}
              onChange={(e) => addTodo({ ...todo, title: e.target.value })}
              fullWidth
              margin="normal"
            />
        
          <TextField
            id="outlined-multiline-static"
            label="Notes"
            variant="outlined"
            multiline
            rows={todo["notes"].length +1}
            defaultValue={todo["notes"].join("\n")}
            onChange={(e) => addTodo({ ...todo, notes: [e.target.value] })}
            fullWidth
            margin="normal"
          />
          
          <Rating
            name="Importance of 5"
            value={todo["imp"]}
            onChange={(event, newValue) => {
              addTodo({ ...todo, imp: newValue });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => addTask(todo)}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    )) || <></>
  );
};

export default AddTodoNew;
