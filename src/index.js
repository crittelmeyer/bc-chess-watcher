import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from 'app/App'
import registerServiceWorker from './registerServiceWorker'
import store from 'app/redux/store'

import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
