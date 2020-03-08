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

  const {
    getUser,
    getUserReposSortStars,
    getUserReposSortCreated,
    loading,
    user,
    reposSortCreated,
    reposSortStars
  } = githubContext;

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
    public_gists,
    hireable
  } = user;

  const [langData, setLangData] = useState(null);

  const getLangData = () => {
    const me = new GhPolyglot(`bradtraversy`);
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err);
      }
      setLangData(stats);
    });
  };

  useEffect(() => {
    getUser(match.params.login);
    getUserReposSortCreated(match.params.login);
    getUserReposSortStars(match.params.login);
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
          <p>Location: {location}</p>
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
                  <strong>Username:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong> <a href={blog}>{blog}</a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <div className='card text-center grid-2'>
        <MostStarredReposChart repos={reposSortStars} />
        {langData && <TopLanguagesChart langData={langData} />}
      </div>
      <Repos repos={reposSortCreated} />
    </Fragment>
  );
};

export default User;
