import {Map, OrderedSet} from 'immutable';

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

function drag(state, asset, bucketIndex) {
  var unallocatedAssets = state.getIn(['unallocatedAssets', 'assets']);

  if (bucketIndex === undefined) {
    bucketIndex = state.get('buckets').size;
    state = state.updateIn(['buckets'], buckets => buckets.push(new Map({
      name: 'Untitled group',
      assets: new OrderedSet([])
    })));
  }

  return state.updateIn(
    ['unallocatedAssets', 'assets'],
    assets => assets.filter(a => a.id !== asset.id)
  ).updateIn(
    ['buckets'],
    buckets => buckets.map(bucket => bucket.updateIn(
      ['assets'],
      assets => assets.filter(a => a.id !== asset.id)
    ))
  ).updateIn(
    ['buckets', bucketIndex, 'assets'],
    assets => assets.add(asset)
  );
}

function nameBucket(state, bucketIndex, bucketName) {
  return state.setIn(['buckets', bucketIndex, 'name'], bucketName);
}

function deleteBucket(state, bucketIndex) {
  debugger;
  return state.updateIn(
    ['unallocatedAssets', 'assets'],
    assets => assets.concat(state.getIn(['buckets', bucketIndex, 'assets'])
  )).deleteIn(['buckets', bucketIndex]);
}

export default function(state = new Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'CATEGORIZE':
    return categorize(state, action.category);
  case 'DRAG':
    return drag(state, action.asset, action.bucketIndex);
  case 'NAMEBUCKET':
    return nameBucket(state, action.bucketIndex, action.bucketName);
  case 'DELETEBUCKET':
    return deleteBucket(state, action.bucketIndex);
  }
  return state;
}
