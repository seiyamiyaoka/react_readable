import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const logger = createLogger()
const store = createStore(reducer, applyMiddleware(logger, thunk))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
 );
registerServiceWorker();
