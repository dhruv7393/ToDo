import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useHeaderState } from "../state/atoms/headers";
import { useError } from "../state/atoms/error";

const EditTodoNew = ({ onClose, open, task, updateTask }) => {
  const handleClose = () => {
    onClose();
  };

  const [todo, addTodo] = useState({ ...task });

  return (
    (open && (
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
      >
        <DialogTitle>{todo["title"]}</DialogTitle>

        <DialogContent>
        
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
          <Button variant="contained" onClick={() => updateTask(todo)}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    )) || <></>
  );
};

export default EditTodoNew;
