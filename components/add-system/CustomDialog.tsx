"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  text: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CustomDialog({ text, open, setOpen }: Props) {
  const onButtonClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => StereoPannerNode}>
      <DialogTitle className="text-center">Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions className="flex justify-center">
        <Button onClick={onButtonClick} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
