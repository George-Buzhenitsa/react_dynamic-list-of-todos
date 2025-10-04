/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedParam, setSelectedParam] = useState<string>('all');
  const [inputParam, setInputParam] = useState<string>('');
  const loadDate: Date = new Date();

  const filteredBySelected = useMemo(() => {
    return [...todos].filter((todo: Todo) => {
      if (selectedParam === 'completed') {
        return todo.completed === true;
      }

      if (selectedParam === 'active') {
        return todo.completed === false;
      }

      return todo;
    });
  }, [inputParam, loadDate])

  const filteredTodos = useMemo(() => {
    console.log('filtered todos')
    return [...filteredBySelected].filter((todo: Todo) => {
      return todo.title.toLowerCase().includes(inputParam.toLowerCase());
    });
  }, [inputParam, loadDate]);

  const getTodoData = async () => {
    const todoData = await getTodos();
    setTodos(todoData);
  }

  const getSelectedTodo = (todoId: number | null) => {
    setSelectedTodo(null);
    setUser(null);
    const foundTodo = todos.find((todo: Todo) => todoId === todo.id) || null;
    setSelectedTodo(foundTodo);
    getSelectedUser(foundTodo?.userId);
  }

  const getSelectedUser = async (userId: number | undefined) => {
    if (!userId) {
      return;
    }
    const userData = await getUser(userId);
    setUser(userData);
  }

  useEffect(() => {
    getTodoData();
  }, [])

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedParam={setSelectedParam}
                setInputParam={setInputParam}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                getSelectedTodo={getSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          user={user}
          getSelectedTodo={getSelectedTodo}
        />
      )}
    </>
  );
};
