// import { Grid } from "@mui/material";
import Widget1 from "../components/widget1/Widget1";
// import Widget2 from "../components/widget2/Widget2";

type Props = {};

const Dashboard = (_props: Props) => {
  return (
    <>
      {/* <Header /> */}
      <Widget1 />
      {/* <WebSocketComponent /> */}
      {/* <Grid container spacing={4} mt={4}>
        <Grid item md={6}>
          <Widget2 />
        </Grid>
        <Grid item md={6}>
          <Widget2 />
        </Grid>
      </Grid> */}
    </>
  );
};

export default Dashboard;
