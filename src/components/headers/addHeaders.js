import React, { useState } from "react";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useHeaderState } from "../state/atoms/headers";
import { useError } from "../state/atoms/error";
import { addNewHeader } from "../state/selectors/headers";

function AddHeader(props) {
  const { onClose, open } = props;

  const { header, setHeader, headerAtTop, setHeaderAtTop } = useHeaderState();
  const { setError } = useError();

  const [headerIP, addHeaderIP] = useState("");
  const [pinned, setPinned] = useState(false);

  const addHeader = () => {
    addNewHeader(
      { title: headerIP, pinned: pinned },
      header,
      setHeader,
      headerAtTop,
      setHeaderAtTop,
      setError
    );
    handleClose();
  };

  const handleClose = () => {
    addHeaderIP("");
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ m: 0, p: 2 }}
      id="customized-dialog-title"
    >
      <DialogTitle>Add Header</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          variant="outlined"
          defaultValue={headerIP}
          onChange={(e) => addHeaderIP(e.target.value)}
          fullWidth
          autoFocus
        />
        Pinned:{" "}
        <Switch
          aria-label="pinned"
          checked={pinned}
          onClick={() => setPinned(!pinned)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => addHeader()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddHeader;
