import React, { useState } from "react";
import AddHeader from "./addHeaders";
import Button from "@mui/material/Button";
import EditHeader from "./editHeaders";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        Add Header
      </Button>
      <AddHeader open={open} onClose={handleClose} />

      <Button
        variant="outlined"
        onClick={handleEditClickOpen}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        Edit Header
      </Button>
      <EditHeader open={openEdit} onClose={handleEditClose} />
    </>
  );
};

export default Header;
