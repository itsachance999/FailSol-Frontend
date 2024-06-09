import { Grid } from "@mui/material";
import MintSection from "./mint-section/MintSection";
import ShowSection from "./show-section";
import History from "./mint-section/History";
import MyPoints from "./my-points";
import TpsChart from "./tps-chart";

type Props = {};

const Widget1 = (_props: Props) => {
  return (
    <>
      <Grid container mt={8} spacing={4}>
        <Grid item md={6} xs={12}>
          <MintSection />
          {/* <Box mt={4} /> */}
        </Grid>
        <Grid item md={6} xs={12}>
          <ShowSection />
        </Grid>
      </Grid>
      <Grid container mt={1} spacing={4}>
        <Grid item md={6} xs={12}>
          <History />
        </Grid>
        <Grid item md={6} xs={12}>
          <MyPoints />
        </Grid>
      </Grid>
      <TpsChart />
    </>
  );
};

export default Widget1;
