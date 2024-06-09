import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

type Props = {};

const HistoryChart = (_props: Props) => {
  const chartOptions: ApexOptions = {
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    colors: ["#FDD15C", "#83CFAA", "#BBDEF8", "#617BE3"],

    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
      ],
    },
    // legend: {
    //   position: "right",
    //   offsetY: 40,
    // },
    fill: {
      opacity: 1,
    },
  };
  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type={chartOptions.chart?.type}
        height={chartOptions.chart?.height}
      />
    </div>
  );
};

export default HistoryChart;
