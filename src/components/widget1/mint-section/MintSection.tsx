import {
  Box,
  CircularProgress,
  Dialog,
  FormControlLabel,
  Paper,
  Radio,
  styled,
} from "@mui/material";
import { useState } from "react";
import Mint from "./Mint";
import Gift from "./Gift";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Root = styled(Paper)(() => ({
  borderRadius: 16,
  padding: "0px 20px",
  // padding: 16,
  height: "100%",
  //   width: "100%",

  //   width: "100%",
}));

const MintSection = (_props: Props) => {
  const [mode, setMode] = useState<"mint" | "gift">("mint");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Root>
      <FormControlLabel
        control={
          <Radio checked={mode === "mint"} onChange={() => setMode("mint")} />
        }
        label="Mint"
      ></FormControlLabel>
      <FormControlLabel
        control={
          <Radio checked={mode === "gift"} onChange={() => setMode("gift")} />
        }
        label="Gift"
      ></FormControlLabel>
      <Box alignContent={"center"}>
        {mode === "mint" && <Mint handleClose={(e) => setOpen(e)} />}
        {mode === "gift" && <Gift handleClose={(e) => setOpen(e)} />}
      </Box>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <CircularProgress />
      </Dialog>
      <ToastContainer />
    </Root>
  );
};

export default MintSection;
