import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function categorize(state, category) {
  var unallocatedAssets = state.get('unallocatedAssets').get('assets').filter(asset => asset.get(category));
  var extraBuckets = unallocatedAssets.groupBy(asset =>
    asset.get(category)
  ).map((k, v) =>
    new Map({name: v, assets: k})
  ).toList();
  debugger;

  // TODO Fix bug removing existing buckets
  return state.mergeIn(['buckets'], extraBuckets);//.deleteIn(['unallocatedAssets'], unallocatedAssets);
}

export default function(state = new Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'CATEGORIZE':
    return categorize(state, action.category);
  }
  return state;
}
