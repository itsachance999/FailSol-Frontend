import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import SwitchTab from "./switch-tab";
import HistoryChart from "./history-chart";

type Props = {};
const Root = styled(Paper)(() => ({
  borderRadius: 16,
  //   padding: 16,
  height: "100%",
}));

const MyPoints = (_props: Props) => {
  return (
    <Root>
      <Box p={3}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h5">My points</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary">
              Visit Dashboard
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-between"} mt={1}>
          <Grid item>
            <SwitchTab />
          </Grid>
          <Grid item></Grid>
        </Grid>
        {/* <Grid container> */}
        <HistoryChart />
        {/* </Grid> */}
      </Box>
    </Root>
  );
};

export default MyPoints;
