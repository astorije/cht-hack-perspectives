import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

import {List, Map} from 'immutable';

// var assets = new Map({
//   unallocatedAssets: List.of('i-123'),
//   buckets: List.of(
//     List.of('i-456', 'i-789'),
//     List.of()
//   )
// });

import {setState} from './action_creators';

const store = createStore(reducer);
store.dispatch(setState({
  unallocatedAssets: {
    assets: [
      {id: 'i-123', region: 'a'},
      {id: 'i-456', region: 'b'},
      {id: 'i-789', region: 'c'},
      {id: 'i-abc', region: 'b'},
      {id: 'i-def', region: ''},
    ]
  },
  buckets: [
    { name: 'Empty Group', assets: [] },
  ]
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
