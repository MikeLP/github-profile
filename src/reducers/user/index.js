import {getUserActivity, getUserStatistics} from './tools'

import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE
} from 'constants/actionTypes'

const defaultState = {
  isFetching: false,
  profile: {
    login: null,
    name: null,
    bio: null,
    location: null,
    following: {nodes: [], totalCount: 0},
    followers: {nodes: [], totalCount: 0},
    repositories: {nodes: [], totalCount: 0},
    repositoriesContributedTo: {nodes: [], totalCount: 0},
    starredRepositories: {nodes: [], totalCount: 0},
    issues: {nodes: [], totalCount: 0},
    pullRequests: {nodes: [], totalCount: 0},
    watching: {totalCount: 0}
  },
  statistics: [],
  activity: {
    years: [],
    events: []
  }
}

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function user (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        profile: action.payload,
        activity: getUserActivity(action.payload),
        statistics: getUserStatistics(action.payload)
      }
    default:
      return state
  }
}
