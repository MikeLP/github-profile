import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './style.scss'

const Header = props => (
  <header styleName={classNames('Header', {transparent: props.transparent, absolute: props.absolute})}>
    <div styleName='content' className='container'>
      <div styleName='logotype'>
        <div styleName='logo' />
        <div styleName='title'>GitHub Analytics</div>
      </div>
      <nav styleName='navigation'>
        <Link styleName='link' to='/' >Main</Link>
        <Link styleName='link' to='/profile/me' >My Profile</Link>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  transparent: PropTypes.bool,
  absolute: PropTypes.bool
}

Header.defaultProps = {
  transparent: false,
  absolute: false
}

export default Header
