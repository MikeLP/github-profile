import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from 'services/history'
import Routes from './rootRoutes'

// NOTE: React Router v4 uses seperate imports for dom and native now!
// It also automatically creates a history object for you.

const ApplicationNode = ({store}) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  )
}

ApplicationNode.propTypes = {
  store: PropTypes.object.isRequired
}

export default ApplicationNode
