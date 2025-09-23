import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({data}) => {
  if (!data || data.length === 0) {
    return <div>No data to display.</div>;
  }
  const series = data.map(item => item.totalUsers);
  const labels = data.map(item => item.status);
  const options = {
    chart: {
      width: 380
    },
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="pie-chart-container">
      <Chart
        options={options}
        series={series}
        type="donut"
      />
    </div>
  );
};

export default PieChart;