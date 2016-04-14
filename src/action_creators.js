export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function categorize(category) {
  return {
    type: 'CATEGORIZE',
    category
  };
}

export function drag(asset, bucketIndex) {
  return {
    type: 'DRAG',
    asset,
    bucketIndex
  };
}

export function nameBucket(bucketIndex, bucketName){
  return {
    type: 'NAMEBUCKET',
    bucketIndex,
    bucketName
  }
}

export function deleteBucket(bucketIndex){
  return {
    type: 'DELETEBUCKET',
    bucketIndex
  }
}

export function selectAsset(asset) {
  return {
    type: 'SELECTASSET',
    asset
  };
}

export function unselectAsset(asset) {
  return {
    type: 'UNSELECTASSET'
  };
}
