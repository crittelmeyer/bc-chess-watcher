import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './state/reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  )
)

sagaMiddleware.run(rootSaga)

export default store
