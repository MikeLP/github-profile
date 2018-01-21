import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './style.scss'

const Button = props => (
  props.to ? (
    <Link styleName='Button' className={props.className} to={props.to}>{props.children}</Link>
  ) : (
    <button className={props.className} styleName='Button'>{props.children}</button>
  )
)

Button.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
  className: PropTypes.string
}

export default Button
