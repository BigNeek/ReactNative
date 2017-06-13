import uuid from 'uuid';

module.exports = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodos = [
        ...state.todos,
        {
          text: action.payload,
          id: uuid.v4()
        }
      ];
      return {
        todos: newTodos
      };

    case 'DELETE_TODO':
      const newerTodos = state.todos.filter((todo) => {
        if (todo.id === action.payload) {
          return false;
        }
          return true;
      });

      return {
        todos: newerTodos
      };

    default:
      return state;
  }
};
