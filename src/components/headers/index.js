import React, { useState } from "react";
import AddHeader from "./addHeaders";
import Button from "@mui/material/Button";

const Header = () => {
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
        Add Header
      </Button>
      <AddHeader open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
