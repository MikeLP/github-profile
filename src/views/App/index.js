import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './style.scss'

import Profile from 'views/Profile'
import LandingPage from 'views/LandingPage'

import Footer from 'components/Footer'

export default () => [
  <Switch key='main'>
    <Route exact path='/' component={LandingPage} />
    <Route path='/profile/me' component={Profile} />
    <Redirect from='/profile' to='/profile/me' />
  </Switch>,
  <Footer key='footer' />
]
