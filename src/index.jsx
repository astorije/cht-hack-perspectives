import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

import {OrderedSet} from 'immutable';

import {setState} from './action_creators';

function makeid()
{
    var text = "";
    var possible = "abcdef0123456789";

    for(var i=0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function randomIn(items) {
  return items[Math.floor(Math.random()*items.length)];
}

var instances = [];
for (var i=0; i<500; i++) {
  instances.push({
    id: "i-" + makeid(),
    state: randomIn(['running', 'stopped', 'terminated']),
    status: randomIn(['active', 'inactive']),
    type: randomIn(['m3.large', 't2.medium', 'c3.large', 'r3.2xlarge', 't2.nano', 'm3.medium', 'r3.large', 'm1.small']),
    zone: randomIn(['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d', 'us-gov-west-1b']),
    function: randomIn(['Elasticsearch Clusters', 'Web Servers', 'Databases', 'API Servers', '']),
    owner: randomIn(['Jérémie', 'Matt', 'Alice', 'John', 'Jane', ''])
  });
}

const store = createStore(reducer);
store.dispatch(setState({
  unallocatedAssets: {
    assets: new OrderedSet(instances)
  },
  buckets: []
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
