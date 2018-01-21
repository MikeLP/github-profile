import {createStore, applyMiddleware, compose} from 'redux'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import rootReducer from 'reducers'

export function configureStore (initialState = {}) {
  const middleware = [thunk, multi, ReduxPromise]

  const enhancers = [
    applyMiddleware(...middleware)
  ]

  if (process.env.NODE_ENV !== 'production') {
    // I've removed default redux devtool to use extension instead. Sorry ¯\_(ツ)_/¯
    // noinspection JSUnresolvedVariable, JSUnresolvedFunction
    window.__REDUX_DEVTOOLS_EXTENSION__ && enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  // For hot reloading of react components
  // Also for debugging
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })

    store.subscribe(() => {
      console.info('State Tree', store.getState())
    })
  }

  return store
}
