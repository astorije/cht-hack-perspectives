import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function categorize(state, category) {
  var unallocatedAssets = state.get('unallocatedAssets').get('assets');
  var assetsToAllocate = unallocatedAssets.filter(asset => asset[category]);

  var extraBuckets = assetsToAllocate.groupBy(asset =>
    asset[category]
  ).map((k, v) => {
    return new Map({name: v, assets: k});
  }).toList();

  return state.updateIn(
    ['buckets'],
    buckets => buckets.concat(extraBuckets)
  ).setIn(
    ['unallocatedAssets', 'assets'],
    unallocatedAssets.subtract(assetsToAllocate)
  );
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
