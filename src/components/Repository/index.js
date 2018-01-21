import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Star from './Star'
import Fork from './Fork'

import './style.scss'

const Date = date => moment(date).format('MMM m, YYYY')

const Repository = props => (
  <div styleName='Repository'>
    <a styleName='name' target='_blank' href={props.data.url}>{props.data.name}</a>
    {props.data.isFork &&
    <div styleName='fork'>Forked form <a href={props.data.parent.url}>{props.data.parent.nameWithOwner}</a></div>}
    <div styleName='description'>{props.data.description}</div>
    <div styleName='info'>
      {props.data.primaryLanguage && (
        <div styleName='inline'>
          <div data-lang={props.data.primaryLanguage.name.toLocaleLowerCase()} styleName='ball' />
          {props.data.primaryLanguage.name}
        </div>
      )}
      {props.data.stargazers.totalCount > 0 && (
        <div styleName='inline'><Star />{props.data.stargazers.totalCount}</div>
      )}
      {props.data.forks.totalCount > 0 && (
        <div styleName='inline'><Fork />{props.data.forks.totalCount}</div>
      )}
      <div styleName='inline'>
        {props.data.updatedAt ? `Updated on ${Date(props.data.updatedAt)}` : `Created at ${Date(props.data.createdAt)}`}
      </div>
    </div>
  </div>
)

Repository.propTypes = {
  data: PropTypes.object
}

export default Repository
