export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    payload: text
  };
};

export const deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    payload: id
  };
};
