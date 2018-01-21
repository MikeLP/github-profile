import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Badge = props => props.children ? <span styleName='Badge'>{props.children}</span> : null

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Badge
