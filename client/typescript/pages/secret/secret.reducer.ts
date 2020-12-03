const { UPDATE_TODOS, INIT_TODO_LIST } = require("./secret.actions");

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT_TODO_LIST:
      return Object.assign({}, state, { todoList: action.todoList });

    case UPDATE_TODOS:
      return Object.assign({}, state, { todoList: { todos: action.todos } });

    default:
      return state;
  }
};


