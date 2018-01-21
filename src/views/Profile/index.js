import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import classNames from 'classnames'
import CalendarHeatmap from 'react-calendar-heatmap'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'

import {fetchProfile} from 'actions/user'

import Header from 'components/Header'
import Repository from 'components/Repository'
import UseProfile from 'components/Profile'
import User from 'components/User'
import Spinner from 'components/UI/Spinner'
import Chart from 'components/UI/Chart'
import Badge from 'components/UI/Badge'

import './style.scss'

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends PureComponent {
  static propTypes = {
    fetchProfile: PropTypes.func,
    isFetching: PropTypes.bool,
    profile: PropTypes.object,
    activity: PropTypes.object,
    statistics: PropTypes.array,
    match: PropTypes.object
  }

  get isFetching () {
    return this.props.isFetching
  }

  /**
   *
   * @returns {null}
   */
  get id () {
    return this.props.match.params.id || null
  }

  get profile () {
    return this.props.profile || {}
  }

  get activity () {
    return this.props.activity || {}
  }

  get lastActiveYear () {
    return this.activity.years[this.activity.years.length - 1] || null
  }

  get selectedYear () {
    return this.state.activityYear || this.lastActiveYear
  }

  get repositories () {
    return this.profile.repositories.nodes || []
  }

  get starredRepositories () {
    return this.profile.starredRepositories.nodes || []
  }

  get followers () {
    return this.profile.followers.nodes || []
  }

  get following () {
    return this.profile.following.nodes || []
  }

  constructor (props) {
    super(props)
    this.state = {
      activityYear: this.lastActiveYear
    }
  }

  componentDidMount () {
    this.props.fetchProfile(this.id)
  }

  static classForValue (value) {
    const limit = 4
    if (!value) {
      return 'color-empty'
    }
    return `color-github-${value.count <= limit ? value.count : limit}`
  }

  render () {
    return [
      <Header key='header' />,
      <main key='page' styleName='Profile'>
        {this.isFetching ? <Spinner center /> : this.profile.login ? (
          <div styleName='content' className='container'>
            <div styleName='column small'>
              <UseProfile profile={this.profile} />
            </div>
            <div styleName='column activity'>
              <Tabs>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Repositories <Badge>{this.profile.repositories.totalCount}</Badge></Tab>
                  <Tab>Stars <Badge>{this.profile.starredRepositories.totalCount}</Badge></Tab>
                  <Tab>Followers <Badge>{this.profile.followers.totalCount}</Badge></Tab>
                  <Tab>Following <Badge>{this.profile.following.totalCount}</Badge></Tab>
                </TabList>

                <TabPanel>
                  <section styleName='section'>
                    <h2 styleName='title'>User Activity</h2>
                    <CalendarHeatmap
                      styleName='heatmap'
                      showOutOfRangeDays
                      startDate={new Date(`${this.selectedYear}-01-01`)}
                      endDate={new Date(`${this.selectedYear}-12-31`)}
                      classForValue={Profile.classForValue}
                      values={this.activity.events}
                    />
                    <div styleName='years'>
                      {this.activity.years.map(year =>
                        <div
                          onClick={() => this.setState({activityYear: year})}
                          styleName={classNames('year', {active: this.selectedYear === year})}
                          key={year}>{year}</div>)}
                    </div>
                  </section>
                  <section styleName='section'>
                    <h2 styleName='title'>User Statistic</h2>
                    <Chart data={this.props.statistics} />
                  </section>
                </TabPanel>
                <TabPanel>
                  <section styleName='section'>
                    <h2 styleName='title'>Repositories</h2>
                    {this.repositories.map(repo =>
                      <Repository key={repo.id} data={repo} />)}
                  </section>
                </TabPanel>
                <TabPanel>
                  <section styleName='section'>
                    <h2 styleName='title'>Stars</h2>
                    {this.starredRepositories.map(repo =>
                      <Repository key={repo.id} data={repo} />)}
                  </section>
                </TabPanel>
                <TabPanel>
                  <section styleName='section'>
                    <h2 styleName='title'>Followers</h2>
                    {this.followers.map(user =>
                      <User key={user.id} data={user} />)}
                  </section>
                </TabPanel>
                <TabPanel>
                  <section styleName='section'>
                    <h2 styleName='title'>Following</h2>
                    {this.following.map(user =>
                      <User key={user.id} data={user} />)}
                  </section>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        ) : <div>No Profile</div>}
      </main>
    ]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchProfile
  }, dispatch)
}

function mapStateToProps (state, props) {
  return {
    profile: state.user.profile,
    activity: state.user.activity,
    statistics: state.user.statistics,
    isFetching: state.user.isFetching
  }
}

export default Profile
