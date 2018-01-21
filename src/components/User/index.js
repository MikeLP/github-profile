import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/UI/LazyImage'

import './style.scss'

const User = props => (
  <div styleName='User'>
    <Avatar styleName='avatar' url={props.data.avatarUrl} />
    <div styleName='info'>
      <div styleName='name'>
        <a href={`https://github.com/${props.data.login}`} target='_blank'>{props.data.name || props.data.login}</a>
        <a href={`https://github.com/${props.data.login}`} target='_blank' styleName='login'>{props.data.login}</a>
      </div>
      {props.data.bio ? <div styleName='bio'>{props.data.bio}</div> : '...'}
      {props.data.location && <div styleName='bio'>From {props.data.location}</div>}
    </div>
  </div>
)

User.propTypes = {
  data: PropTypes.object
}

export default User
