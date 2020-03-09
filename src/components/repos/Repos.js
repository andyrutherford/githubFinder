import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repoData }) => {
  return repoData
    .slice(0, 9)
    .map(repo => <RepoItem key={repo.id} repo={repo} />);
};

Repos.propTypes = {
  repoData: PropTypes.array.isRequired
};

export default Repos;
