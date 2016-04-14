import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

import {OrderedSet} from 'immutable';

import {setState} from './action_creators';

const store = createStore(reducer);
store.dispatch(setState({
  unallocatedAssets: {
    assets: new OrderedSet([
      {id: 'i-123', region: 'a', status: 'active'},
      {id: 'i-456', region: 'b', status: 'inactive'},
      {id: 'i-789', region: 'c', status: 'active'},
      {id: 'i-abc', region: 'b', status: 'inactive'},
      {id: 'i-def', region: '', status: 'active'},
      {id: 'i-MOV', region: '', status: ''},
    ])
  },
  buckets: [
    { name: 'Empty Group', assets: new OrderedSet([]) },
  ]
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
