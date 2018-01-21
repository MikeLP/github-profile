import moment from 'moment'

/**
 * Check if nodes field exists and return last one
 * @param field
 * @returns {*}
 */
export const getNodes = field => field && field.nodes && field.nodes.length ? field.nodes : []

/**
 *
 * @param ref
 * @returns {Array}
 */
export const getRefCommitHistory = ref => {
  if (ref.target) {
    let activity = []
    getNodes(ref.target.history)
      .forEach(commit => {
        activity = activity.concat([commit.committedDate, commit.pushedDate])
      })
    return activity
  }
  return []
}

/**
 * Calculate user activity
 * @param data
 * @returns {Array}
 */
export const getUserActivity = data => {
  const map = {}
  const years = {}
  let activity = getNodes(data.issues).map(issue => issue.createdAt)
  // Get activity info from pull request and repositories
  getNodes(data.pullRequests)
    .forEach(pullRequest => {
      activity = activity.concat([pullRequest.publishedAt, pullRequest.updatedAt])
    })
  getNodes(data.repositories)
    .forEach(repository => {
      activity = activity.concat(
        [repository.createdAt, repository.pushedAt, repository.updatedAt],
        ...getNodes(repository.refs).map(getRefCommitHistory)
      )
    })

  activity.forEach(activityDate => {
    const date = moment(activityDate)
    const dayDate = date.format('YYYY-MM-DD')

    if (map.hasOwnProperty(dayDate)) {
      ++map[dayDate]
    } else if (activityDate) {
      map[dayDate] = 1
      years[date.year()] = true
    }
  })

  return {
    years: Object.keys(years),
    events: Object
      .keys(map)
      .map(key => ({date: key, count: map[key]}))
  }
}

export const getUserStatistics = data => {
  return [
    {label: 'Repositories', value: data.repositories.totalCount},
    {label: 'Contributed Repositories', value: data.repositoriesContributedTo.totalCount},
    {label: 'Starred Repositories', value: data.starredRepositories.totalCount},
    {label: 'Issues', value: data.issues.totalCount},
    {label: 'Issues Comments', value: data.issueComments.totalCount},
    {label: 'Followers', value: data.followers.totalCount},
    {label: 'Following', value: data.following.totalCount},
    {label: 'Gists Comments', value: data.gistComments.totalCount},
    {label: 'Gists', value: data.gists.totalCount},
    {label: 'Pull Requests', value: data.pullRequests.totalCount},
    {label: 'Watching', value: data.watching.totalCount}
  ]
}
