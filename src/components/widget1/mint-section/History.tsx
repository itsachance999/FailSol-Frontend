import { Box, Divider, Grid, Paper, Typography, styled } from "@mui/material";
import TxTable from "./HistoryTable";
import { useWebSocket } from "../../../providers/WebSocketProvider";
import { green, grey } from "@mui/material/colors";

type Props = {};
const Root = styled(Paper)(() => ({
  borderRadius: 16,
  padding: 16,

  //   width: "100%",

  //   width: "100%",
}));

const History = (_props: Props) => {
  const { status } = useWebSocket();
  return (
    <Root>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h5">Transaction History</Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Typography mr={2}>server status:{status}</Typography>
          <Box
            width={10}
            height={10}
            bgcolor={status === "connected" ? green[500] : grey[700]}
            borderRadius={"50%"}
          />
        </Box>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <TxTable />
      {/* {histories.map((item, index) => (
        <Box
          key={index}
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          columnGap={2}
          mt={2}
        >
          <Typography noWrap>{item.address}</Typography>
          <Typography>{item.count}</Typography>
          <Typography>{item.timestamp}</Typography>
        </Box>
      ))} */}
    </Root>
  );
};

export default History;
