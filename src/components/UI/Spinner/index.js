import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style.scss'

const Spinner = props => (
  <div styleName={classNames('Spinner', {center: props.center})}>
    <div styleName='icon' />
  </div>
)

Spinner.propTypes = {
  center: PropTypes.bool
}

Spinner.defaultProps = {
  center: false
}

export default Spinner
