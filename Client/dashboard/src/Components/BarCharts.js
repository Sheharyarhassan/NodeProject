import React from "react";
import Chart from "react-apexcharts";

const BarCharts = ({data}) => {
  if (!data) {
    return <div>No data to display.</div>;
  }
  const genres = [
    ...new Set([
      ...(data && data?.activeBooks?.map((b) => b._id) || []),
      ...(data && data?.inactiveBooks?.map((b) => b._id) || []),
    ]),
  ];
  const activeData = genres.map(
    (g) => data.activeBooks?.find((b) => b._id === g)?.totalBooks || 0
  );

  const inactiveData = genres.map(
    (g) => data.inactiveBooks?.find((b) => b._id === g)?.totalBooks || 0
  );
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val, // simple count (remove `/1000 + "K"` if you want raw numbers)
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: genres,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#008FFB", "#FF4560"], // Active = blue, Inactive = red
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  // Series data
  const series = [
    {
      name: "Active",
      group: "Active",
      data: activeData,
    },
    {
      name: "Inactive",
      group: "Inactive",
      data: inactiveData,
    },
  ];

  return (
    <div className="bar-chart-container">
      <Chart options={options} series={series} type="bar" height={350}/>
    </div>
  );
};

export default BarCharts;
