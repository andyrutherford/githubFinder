import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { randomColor } from '../../../utils';

const TopLanguagesChart = ({ langData, description }) => {
  const [langChartData, setLangChartData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const initLangChart = () => {
    langData = langData.slice(0, 20);
    const labels = langData.map(lang => lang.label);
    const data = langData.map(lang => lang.value);
    const colors = langData.map(lang => lang.color);

    setLangChartData(data);

    if (data.length > 0) {
      const state = {
        labels: labels,
        datasets: [
          {
            backgroundColor: colors,
            data: data
          }
        ]
      };
      setChartData(state);
    }
  };

  useEffect(() => {
    if (langData.length) {
      initLangChart();
    }
  }, []);

  return (
    <div>
      <Pie
        data={chartData}
        options={{
          title: {
            responsive: true,
            maintainAspectRatio: true,
            display: true,
            text: description,
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
};

TopLanguagesChart.defaultProps = {
  description: 'Top Languages'
};

export default TopLanguagesChart;
