import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

type Props = {
  open: boolean;
  onClose: () => void;
  onButtonClick: () => void;
};

export default function ErrorDialog({ open, onClose, onButtonClick }: Props) {
  return (
    <Dialog open={open} onClose={() => StereoPannerNode}>
      <DialogTitle className="text-center">Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sorry, looks like there are some errors detected, please try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="flex justify-center">
        <Button onClick={onButtonClick} color="primary">
          Ok, got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
