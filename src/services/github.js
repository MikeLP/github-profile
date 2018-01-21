import 'whatwg-fetch'
import {jsonToGraphQLQuery} from 'json-to-graphql-query'

import {
  GITHUB_API_URL,
  GITHUB_PERSONAL_ACCESS_TOKEN
} from '../constants'

const method = 'POST'
const mode = 'cors'

/**
 *
 * @type object
 */
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charser=utf-8',
  'Authorization': `bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
}

/**
 * Make a graphql queries to GitHub API v4.
 * Example - api({viewer: {login: true}})
 *
 * @param query
 * @param dump
 * @returns {Promise<any>}
 */
const api = (query, dump = false) => {
  dump && console.info(jsonToGraphQLQuery({query}, {pretty: true}))
  const body = JSON.stringify({query: jsonToGraphQLQuery({query})})
  return window.fetch(GITHUB_API_URL, {
    method,
    headers,
    mode,
    body
  })
    .then(response => response.json())
    .then(response => {
      if (response && response.data) return response
      return window.Promise.reject(response)
    })
}

export default api
