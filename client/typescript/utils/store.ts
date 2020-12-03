let state = {};
const callbacks = [];
const reducers = [];

const Store = {

  subscribe: onUpdate => {
    callbacks.push(onUpdate);
  },

  dispatch: action => {
    state = reducers.reduce((state, reducer) => {
      return reducer(state, action);
    }, state);
  
    callbacks.forEach(fn => {
      fn(state, action);
    });
  },
  
  addModule: (name, reducer) => {
    state[name] = {};
    reducers.push(reducer);
  }
}

export default Store;
