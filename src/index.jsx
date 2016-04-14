import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

import {Set} from 'immutable';

import {setState} from './action_creators';

const store = createStore(reducer);
store.dispatch(setState({
  unallocatedAssets: {
    assets: new Set([
      {id: 'i-123', region: 'a'},
      {id: 'i-456', region: 'b'},
      {id: 'i-789', region: 'c'},
      {id: 'i-abc', region: 'b'},
      {id: 'i-def', region: ''},
    ])
  },
  buckets: [
    { name: 'Empty Group', assets: new Set([]) },
  ]
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
