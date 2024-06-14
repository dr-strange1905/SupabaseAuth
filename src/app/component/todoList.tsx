import React from 'react';

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <ul className="max-w-sm mx-auto mt-4">
    {todos.map((todo) => (
      <li key={todo.id} className="flex items-center justify-between border-b border-gray-300 py-2">
       <span className="text-gray-800 font-medium text-lg">{todo.text}</span>


        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
  
  );
};

export default TodoList;
