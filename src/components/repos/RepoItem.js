import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
  return (
    <div className='card repo-card'>
      <div className='repo-content'>
        <h2>
          <i className='fas fa-swatchbook'></i>{' '}
          <a href={repo.html_url}>{repo.name}</a>
        </h2>
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
              <i className='fas fa-terminal'></i>{' '}
              {repo.language === 'JavaScript' ? 'JS' : repo.language}
            </p>
          </div>
          <div className='repo-stat'>
            <p>
              <i className='far fa-star'></i> {repo.stargazers_count}
            </p>
          </div>
          <div className='repo-stat'>
            <p>
              <i className='fas fa-code-branch'></i> {repo.forks}
            </p>
          </div>
          <div className='repo-stat'>
            <p>
              {' '}
              {repo.size && repo.size > 1000
                ? Math.floor(repo.size / 100) + ' MB'
                : repo.size + ' KB'}
            </p>
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
