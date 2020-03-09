import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
  return (
    <div className='card repo-card'>
      <div className='repo-content'>
        <h3>
          <i class='fas fa-swatchbook'></i>{' '}
          <a href={repo.html_url}>{repo.name}</a>
        </h3>
        <p className='repo-description'>
          {repo.description ? (
            repo.description
          ) : (
            <em>No description found...</em>
          )}
        </p>
      </div>
      <div className='repo-footer'>
        <div className='repo-stats'>
          <div className='repo-stat'>
            <p>
              <i class='fas fa-terminal'></i>{' '}
              {repo.language === 'JavaScript' ? 'JS' : repo.language}
            </p>
          </div>
          <div className='repo-stat'>
            <p>
              <i class='far fa-star'></i> {repo.stargazers_count}
            </p>
          </div>
          <div className='repo-stat'>
            <p>
              <i class='fas fa-code-branch'></i> {repo.forks}
            </p>
          </div>
          <div className='repo-stat'>
            <p> {repo.size} KB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
