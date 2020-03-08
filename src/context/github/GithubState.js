import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS_SORT_CREATED,
  GET_REPOS_SORT_STARS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    reposSortCreated: [],
    reposSortStars: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientId}&client_secret
        ${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Get User
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=
        ${githubClientId}&client_secret
        ${githubClientSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repos sorted by create date
  const getUserReposSortCreated = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=
        ${githubClientId}&client_secret
        ${githubClientSecret}`
    );

    dispatch({ type: GET_REPOS_SORT_CREATED, payload: res.data });
  };

  // Get Repos sorted by star count
  const getUserReposSortStars = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=
        ${githubClientId}&client_secret
        ${githubClientSecret}`
    );

    dispatch({ type: GET_REPOS_SORT_STARS, payload: res.data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        reposSortCreated: state.reposSortCreated,
        reposSortStars: state.reposSortStars,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserReposSortCreated,
        getUserReposSortStars
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
