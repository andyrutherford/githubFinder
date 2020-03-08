import React from 'react';
import { Bar } from 'react-chartjs-2';
import { randomColor } from '../../../utils';

const MostStarredReposChart = ({ description, repos }) => {
  const repoTitles = repos
    .map(repo => {
      return {
        repoName: repo.name,
        repoStars: repo.stargazers_count,
        repoColor: randomColor()
      };
    })
    .sort((a, b) => b.repoStars - a.repoStars)
    .slice(0, 5);

  const state = {
    labels: repoTitles.map(repo => repo.repoName),
    datasets: [
      {
        backgroundColor: repoTitles.map(repo => repo.repoColor),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: repoTitles.map(repo => repo.repoStars)
      }
    ]
  };

  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            responsive: true,
            maintainAspectRatio: true,
            display: true,
            text: description,
            fontSize: 20
          },
          legend: {
            display: false,
            position: 'right'
          }
        }}
      />
    </div>
  );
};

MostStarredReposChart.defaultProps = {
  description: 'Most Starred Repos'
};

export default MostStarredReposChart;
