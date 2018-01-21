import api from 'services/github'

import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE
} from 'constants/actionTypes'

const user = {
  id: true,
  login: true,
  bio: true,
  websiteUrl: true,
  email: true,
  name: true,
  avatarUrl: true,
  company: true,
  location: true
}

const repository = {
  id: true,
  name: true,
  url: true,
  description: true,
  forkCount: true,
  license: true,
  sshUrl: true,
  forks: {
    totalCount: true
  },
  parent: {
    nameWithOwner: true,
    url: true
  },
  primaryLanguage: {
    name: true
  },
  licenseInfo: {
    url: true,
    name: true,
    nickname: true
  },
  homepageUrl: true,
  stargazers: {
    totalCount: true
  },
  updatedAt: true,
  createdAt: true,
  pushedAt: true,
  isFork: true
}

const query = {
  viewer: {
    ...user,
    issues: {
      __args: {
        first: 20
      },
      totalCount: true,
      nodes: {
        createdAt: true,
        closed: true
      }
    },
    pullRequests: {
      __args: {
        first: 10
      },
      totalCount: true,
      nodes: {
        publishedAt: true,
        updatedAt: true
      }
    },
    gists: {
      totalCount: true
    },
    starredRepositories: {
      __args: {
        last: 50
      },
      totalCount: true,
      nodes: repository
    },
    issueComments: {
      totalCount: true
    },
    gistComments: {
      totalCount: true
    },
    watching: {
      totalCount: true
    },
    following: {
      totalCount: true,
      __args: {
        first: 25
      },
      nodes: user
    },
    followers: {
      totalCount: true,
      __args: {
        first: 25
      },
      nodes: user
    },
    // Get my first 15 repositories where last 5 branches/tags have first 50 my commits
    // (github v4 api have a limitation - max 50 items)
    repositories: {
      __args: {
        first: 15
      },
      totalCount: true,
      nodes: {
        ...repository,
        refs: {
          __args: {
            last: 5,
            refPrefix: 'refs/'
          },
          totalCount: true,
          nodes: {
            name: true,
            target: {
              '... on Commit': {
                history: {
                  __args: {
                    first: 50,
                    author: {
                      emails: 'iyanello@gmail.com'
                    }
                  },
                  nodes: {
                    pushedDate: true,
                    committedDate: true
                  }
                }
              }
            }
          }
        }
      }
    },
    repositoriesContributedTo: {
      totalCount: true
    }
  },
  rateLimit: {
    limit: true,
    cost: true,
    remaining: true,
    resetAt: true
  }
}

export function fetchProfile (id) {
  return dispatch => {
    dispatch({
      type: FETCH_PROFILE_REQUEST,
      isFetching: true
    })

    return api(query)
      .then(response => {
        const {viewer: profile} = response.data || {}

        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          isFetching: false,
          payload: profile
        })
      })
      .catch(error => {
        console.error(error)
        dispatch({
          type: FETCH_PROFILE_FAILURE,
          isFetching: false
        })
      })
  }
}
