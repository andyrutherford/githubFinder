import React, { useEffect, Fragment, useContext, useState } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GhPolyglot from 'gh-polyglot';

import GithubContext from '../../context/github/githubContext';
import MostStarredReposChart from '../users/charts/MostStarredReposChart';
import TopLanguagesChart from '../users/charts/TopLanguagesChart';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, getUserRepos, loading, user, repos } = githubContext;

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    hireable,
    created_at
  } = user;

  const [langData, setLangData] = useState(null);

  const getLangData = () => {
    const me = new GhPolyglot(match.params.login);
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err);
      }
      setLangData(stats);
    });
  };

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    getLangData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          {location && (
            <p>
              <i className='fas fa-map-marker-alt'></i> {location}
            </p>
          )}
          {created_at && (
            <p>
              <i class='far fa-calendar-alt'></i> Joined{' '}
              {created_at &&
                created_at
                  .split('-')
                  .slice(0, 2)
                  .reverse()
                  .join('-')}
            </p>
          )}
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <i className='fab fa-github'></i>{' '}
                  <a href={html_url}>@{login}</a>
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <i className='fas fa-briefcase'></i> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <i className='fas fa-map-pin'></i>
                  <a href={blog}> {blog}</a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className=' text-center'>
        <div className='badge badge-light'>
          {' '}
          <span className='large'>{public_repos}</span>
          <p>Repos</p>
        </div>
        <div className='badge badge-primary'>
          <span className='large'>{followers}</span>
          <p>Followers</p>
        </div>
        <div className='badge badge-success'>
          {' '}
          <span className='large'>{following}</span>
          <p>Following</p>
        </div>
      </div>
      <div className='card text-center grid-2'>
        {repos && <MostStarredReposChart repos={repos} />}
        {langData && <TopLanguagesChart langData={langData} />}
      </div>
      <div className='card'>
        {' '}
        <p className='large'>Top Repos</p>
        <div className='grid-3'> {repos && <Repos repoData={repos} />}</div>
      </div>
    </Fragment>
  );
};

export default User;
