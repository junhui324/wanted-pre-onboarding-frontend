import React, { useState, useEffect } from 'react';
import * as Fetcher from '../../apis/Fetcher';
import { getToken } from '../../apis/Token';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import TodoListChange from './TodoListChange';
import styles from './TodoList.module.scss';

interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
}

function TodoList() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      alert('로그인이 필요합니다!');
      navigate(ROUTES.SIGNIN);
      return;
    }
    getTodos();
  }, []);

  const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleCreateTodo = async () => {
    try {
      const res = await Fetcher.createTodo({ todo });

      setTodos([...todos, { id: res.id, todo, isCompleted: false }]);
      setTodo(''); // Todo 추가 후 입력창 초기화
    } catch (err) {
      alert('Todo 등록이 되지 않았습니다.');
    }
  };

  const getTodos = async () => {
    try {
      const res = await Fetcher.getTodos();
      setTodos(res);
    } catch (err) {
      alert('Todo를 가져오지 못했습니다.');
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const res = await Fetcher.deleteTodo(todoId);

      // 서버에서 Todo를 삭제한 후에 새로운 Todo 리스트를 업데이트
      setTodos((prevTodos) =>
        prevTodos.filter((todoItem) => todoItem.id !== todoId)
      );
    } catch (err) {
      alert('Todo를 삭제하지 못했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>TODOLIST</h2>
      </div>
      <div className={styles.create}>
        <input
          data-testid="new-todo-input"
          type="text"
          value={todo}
          onChange={handleTodoInput}
        ></input>
        <button data-testid="new-todo-add-button" onClick={handleCreateTodo}>
          추가
        </button>
      </div>
      <div className={styles.todo}>
        <ul>
          {todos.map((todoItem) => (
            <TodoListChange
              key={todoItem.id}
              todoItem={todoItem}
              deleteTodo={deleteTodo}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={() => navigate('/')}>메인페이지</button>
      </div>
    </div>
  );
}

export default TodoList;
