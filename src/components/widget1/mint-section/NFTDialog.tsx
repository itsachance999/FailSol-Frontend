import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MetadataType } from "../../../type";
type Props = {
  data: MetadataType[] | [];
  gift?: string;
  open: boolean;
  handleClose: (e: boolean) => void;
};

const NFTDialog = ({ data, gift, open, handleClose }: Props) => {
  const [expanded, setExpanded] = React.useState<number>(0);

  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : -1);
    };

  function abbreviateString(str: string, maxLength = 5) {
    if (str.length <= maxLength) {
      return str; //
    }
    const firstPart = str.substring(0, 5);
    const lastPart = str.substring(str.length - 5);
    return `${firstPart} ... ${lastPart}`;
  }

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      PaperProps={{ sx: { p: 3 } }}
      onClose={() => handleClose(false)}
    >
      <DialogTitle sx={{ fontWeight: 100, fontSize: "16px" }}>
        {gift
          ? // <Typography variant="subtitle1">
            ` You minted ${data.length} FailSol NFT and sent to
            ${abbreviateString(gift)}`
          : // </Typography>
            // <Typography variant="subtitle1">
            ` You minted ${data.length} FailSol NFT`}
      </DialogTitle>
      {data.map((item, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <a
              href={`https://explorer.solana.com/address/${item.address}?cluster=devnet`}
              target="_blank"
            >
              {item.name}
            </a>
          </AccordionSummary>
          <AccordionDetails>
            <img src={item.image} width={"100%"} alt="nft" />
          </AccordionDetails>
          <AccordionActions>
            <Grid container flexDirection={"column"}>
              {item.attributes.map((t, i) => (
                <Box
                  key={i}
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{
                    borderRadius: 1,
                    border: "1px solid grey",
                    mt: 2,
                    p: 2,
                  }}
                >
                  <Typography>{t.trait_type}</Typography>
                  {t.trait_type === "signature" ? (
                    <Typography
                      component={"a"}
                      target="_blank"
                      href={`https://solscan.io/tx/${t.value}`}
                    >
                      {t.trait_type === "signature"
                        ? abbreviateString(t.value)
                        : t.value}
                    </Typography>
                  ) : (
                    <Typography>{t.value}</Typography>
                  )}
                </Box>
              ))}
            </Grid>
          </AccordionActions>
        </Accordion>
      ))}
    </Dialog>
  );
};

export default NFTDialog;
