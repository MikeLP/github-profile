import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Item = props => (
  <div styleName='Item'>
    <div style={{backgroundImage: `url(${props.icon})`}} styleName='icon' />
    <div styleName='title'>{props.title}</div>
    <div styleName='description'>{props.description}</div>
  </div>
)

Item.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}

export default Item
