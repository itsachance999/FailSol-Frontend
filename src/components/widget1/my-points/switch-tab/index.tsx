import { Box, Button, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

type Props = {};

const TabRoot = styled(Box)(({}) => ({
  borderRadius: 4,
  backgroundColor: grey[300],
}));

const SwitchTab = (_props: Props) => {
  const [tvl, setTvl] = useState<boolean>(false);

  return (
    <>
      <TabRoot>
        <Button
          variant="outlined"
          color={tvl ? "inherit" : "secondary"}
          sx={{ border: tvl ? "none" : "" }}
          onClick={() => setTvl(!tvl)}
        >
          Volume
        </Button>
        <Button
          variant="outlined"
          color={tvl ? "secondary" : "inherit"}
          sx={{ border: tvl ? "" : "none" }}
          onClick={() => setTvl(!tvl)}
        >
          TVL
        </Button>
      </TabRoot>
      {/* <ReactApexChart
        className="flex flex-auto items-center justify-center w-full h-full"
        options={chartOptions}
        // series={series}
        type={chartOptions.chart?.type}
        height={chartOptions.chart?.height}
      /> */}
    </>
  );
};

export default SwitchTab;
