import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
// redux
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers/index'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,  
  </Provider>,
  document.getElementById('root')
);