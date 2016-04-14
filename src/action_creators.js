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
