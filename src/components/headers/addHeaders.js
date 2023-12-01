import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Switch from "@mui/material/Switch";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { errorState } from "../state/atoms/error";
import { useRecoilState } from "recoil";

function AddHeader(props) {
  const { onClose, open } = props;
  const [error, setError] = useRecoilState(errorState);

  const handleClose = () => {
    onClose();
  };

  const [headers, addHeaders] = useState({});
  const [headerIP, addHeaderIP] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "headers")
      .then(({ data }) => {
        addHeaders(data.map((dataOfHeader) => dataOfHeader.title));
      })
      .catch((err) => setError(err));
  }, []);

  const addHeader = () => {
    if (headerIP in headers) {
      setError("Header already exists");
    } else {
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "headers", {
          title: headerIP,
          pinned,
        })
        .then((data) => {
          console.log("Header added successfully");
        })
        .catch((err) => setError(err));
    }
    handleClose();
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
