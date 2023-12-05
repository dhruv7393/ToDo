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
import { editHeader, deleteHeader } from "../state/selectors/headers";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

function EditHeader(props) {
  const { onClose, open } = props;

  const { header, headerAtTop, setHeader, setHeaderAtTop } = useHeaderState();
  const { setError } = useError();

  const handleClose = () => {
    onClose();
  };

  const completeHeaders = { ...headerAtTop, ...header };

  const togglePin = (newPin) => {
    editHeader(newPin, setHeader, setHeaderAtTop, setError);
    handleClose();
  };

  const deletePin = (id) => {
    deleteHeader(id, setHeader, setHeaderAtTop, setError);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} id="customized-dialog-title">
      <DialogTitle>Edit Header</DialogTitle>
      <DialogContent>
        {Object.keys({ ...headerAtTop, ...header }).map((headerId) => {
          let { _id, title, pinned } = completeHeaders[headerId];
          return (
            <Card key={"Daily" + _id}>
              <CardHeader
                action={
                  <>
                    <PushPinIcon
                      color={"" + (pinned && "primary")}
                      onClick={() => togglePin({ _id, title, pinned: !pinned })}
                    />
                    <DeleteIcon onClick={() => deletePin(_id)} />
                  </>
                }
                titleTypographyProps={{ fontSize: "0.875rem" }}
                title={title}
              />
            </Card>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

export default EditHeader;
