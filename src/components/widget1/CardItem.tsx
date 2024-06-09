import { Box, Card, Divider, Typography, styled } from "@mui/material";

type Props = {};
const Root = styled(Card)(() => ({
  borderRadius: 12,
  padding: "20px",
  // backgroundColor:'red',

  // width:'100%'
}));

const PaperRoot = styled(Box)(() => ({
  backgroundColor: "#F6F6F6",
  padding: "20px",
  borderRadius: 8,
  marginTop: 6,
}));
const CardItem = (_props: Props) => {
  return (
    <Root>
      <Typography>SOL Supply</Typography>
      <Typography variant="body2">574,605,803.19</Typography>
      <PaperRoot>
        <Typography>Circulating Supply</Typography>
        <Typography>447,047,539.9384 SOL (77.8%)</Typography>
        <Divider sx={{ my: 3 }} />
        <Typography>Circulating Supply</Typography>
        <Typography>447,047,539.9384 SOL (77.8%)</Typography>
      </PaperRoot>
    </Root>
  );
};

export default CardItem;
