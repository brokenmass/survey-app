export const deleteStateKey = (state, key) => {
  if (state.hasOwnProperty(key)) {
    const {[key]: removed, ...remainingState} = state;

    return remainingState;
  } else {
    return state;
  }
};

export const setStateKey = (state, key, value) => {
  if (value === null) {
    return deleteStateKey(state, key);
  } else if (state[key] === value) {
    return state;
  } else {
    return {
      ...state,
      [key]: value
    };
  }
};

export const clearState = (state) => {
  if (Object.keys(state)) {
    return {};
  } else {
    return state;
  }
};
