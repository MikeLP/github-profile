import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/UI/LazyImage'

import style from './style.scss'

const Profile = props => (
  <div styleName='Profile'>
    <Avatar className={style.avatar} url={props.profile.avatarUrl} />
    <div styleName='displayName'>{props.profile.name}</div>
    <div styleName='nickName'>{props.profile.login}</div>
    <div styleName='bio'>{props.profile.bio}</div>
    <div styleName='info'>
      <div styleName='line'>Company - <span styleName='label'>{props.profile.company}</span></div>
      <div styleName='line'>Location - <span styleName='label'>{props.profile.location}</span></div>
      <div styleName='line'>Web Site - <span styleName='label'>
        <a
          target='_blank'
          href={`https://${props.profile.websiteUrl}`}>{props.profile.websiteUrl}</a></span>
      </div>
    </div>
  </div>
)

Profile.propTypes = {
  profile: PropTypes.object
}

export default Profile
