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

function drag(state, bucketIndex) {
  var unallocatedAssets = state.getIn(['unallocatedAssets', 'assets']);

  if (unallocatedAssets.isEmpty()) {
    return state;
  }

  var movableAsset = state.getIn(['unallocatedAssets', 'assets']).last();
  return state.updateIn(
    ['unallocatedAssets', 'assets'],
    assets => assets.delete(movableAsset)
  ).updateIn(
    ['buckets', bucketIndex, 'assets'],
    assets => assets.add(movableAsset)
  );
}

export default function(state = new Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'CATEGORIZE':
    return categorize(state, action.category);
  case 'DRAG':
    return drag(state, action.bucketIndex);
  }
  return state;
}
