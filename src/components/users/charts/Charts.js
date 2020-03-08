import React, { useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import GithubContext from '../../../context/github/githubContext';
import MostStarredReposChart from './MostStarredReposChart';
import TopLanguagesChart from './TopLanguagesChart';

const Charts = ({ match }) => {
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    getUserReposSortCreated(match.params.login);
    getUserReposSortStars(match.params.login);
    // eslint-disable-next-line
  }, [getUserReposSortCreated, getUserReposSortStars]);

  const {
    reposSortCreated,
    reposSortStars,
    getUserReposSortCreated,
    getUserReposSortStars
  } = githubContext;

  return (
    <div className='grid-2'>
      <div className='card text-center'>
        <MostStarredReposChart repos={reposSortStars} />
      </div>
      <div className='card text-center'>
        <TopLanguagesChart repos={reposSortStars} />
      </div>
    </div>
  );
};

export default Charts;
