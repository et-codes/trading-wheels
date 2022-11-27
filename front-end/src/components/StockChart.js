import { Chart } from 'react-google-charts';
import { useState, useEffect } from 'react';


const StockChart = ({ symbol, chart }) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (symbol !== '$CASH') {
      const data = chart.map((point) => {
        const date = new Date(point.date);
        const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
        return [date, point.volume / 1000000, point.close];
      });
      setChartData([['Date', 'Volume', 'Closing Price'], ...data]);
    }
  }, [symbol, chart]);

  const chartOptions = {
    title: `${symbol} 3-month Closing Price Chart`,
    hAxis: { title: "Date", format: "MMM" },
    series: {
      0: { type: "bars", targetAxisIndex: 0, color: "#8E8C84" },
      1: { type: "line", targetAxisIndex: 1, color: "#D9534F" },
    },
    vAxes: {
      0: { logScale: false, title: "Price", minValue: 0 },
      1: { logScale: false, title: "Volume (millions)" },
    },
    legend: { position: "none" },
  };

  return (
    <Chart
      chartType="ComboChart"
      width="450px"
      height="100%"
      data={chartData}
      options={chartOptions}
    />
  );
}

export default StockChart;