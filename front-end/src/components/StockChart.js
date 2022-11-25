import { Chart } from 'react-google-charts';
import { useState, useEffect } from 'react';


const StockChart = ({ symbol, chart }) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (symbol !== '$CASH') {
      const data = chart.map((point) => {
        const date = new Date(point.date);
        const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
        return [dateString, point.volume / 1000000, point.close];
      });
      setChartData([['Date', 'Volume', 'Closing Price'], ...data]);
    }
  }, [symbol, chart]);

  const chartOptions = {
    title: `${symbol} 3-month Closing Price Chart`,
    hAxis: { title: "Date" },
    series: {
      0: { type: "line", targetAxisIndex: 0, color: "#d9534f" },
      1: { type: "bars", targetAxisIndex: 1, color: "#325D88" },
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