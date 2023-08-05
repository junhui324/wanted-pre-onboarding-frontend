import React, { useState } from 'react';
import * as Fetcher from '../../apis/Fetcher';
import styles from './TodoListChange.module.scss';

interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
}

function TodoListChange({
  todoItem,
  deleteTodo,
  setTodos,
}: {
  todoItem: TodoItem;
  deleteTodo: (todoId: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}) {
  const [isModifyClick, setIsModifyClick] = useState<boolean>(false);
  const [modifiedTodo, setModifiedTodo] = useState<string>(todoItem.todo);
  const [isCompleted, setIsCompleted] = useState<boolean>(todoItem.isCompleted);

  const handleModifyClick = () => {
    setIsModifyClick(true);
    setModifiedTodo(todoItem.todo); // 현재 todo 값을 수정 입력창에 초기화
  };

  const handleSubmitClick = async () => {
    try {
      const res = await Fetcher.updateTodo(todoItem.id, {
        todo: modifiedTodo,
        isCompleted: isCompleted,
      });
      setIsModifyClick(false);

      // 서버에서 Todo를 수정한 후에 새로운 Todo 리스트를 업데이트
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === todoItem.id
            ? { ...prevTodo, todo: modifiedTodo, isCompleted }
            : prevTodo
        )
      );
    } catch (err) {
      alert('Todo 수정에 실패했습니다.');
    }
  };

  const handleCancelClick = () => {
    setIsModifyClick(false);
  };

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setIsCompleted(isChecked); // 체크박스 상태를 isCompleted 상태와 동기화

    try {
      const res = await Fetcher.updateTodo(todoItem.id, {
        todo: todoItem.todo,
        isCompleted: isChecked, // 변경: 체크박스 상태를 서버에 보내기
      });

      // 서버에서 Todo를 수정한 후에 새로운 Todo 리스트를 업데이트
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === todoItem.id
            ? { ...prevTodo, isCompleted: isChecked }
            : prevTodo
        )
      );
    } catch (err) {
      alert('Todo 수정에 실패했습니다.');
      // 체크박스 상태를 원래대로 되돌리기
      setIsCompleted((prevIsCompleted) => !prevIsCompleted);
    }
  };

  return (
    <li key={todoItem.id}>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
      </label>
      {!isModifyClick ? (
        <div className={styles.btnContainer}>
          <span className={styles.todoStr}>{todoItem.todo}</span>
          <button data-testid="modify-button" onClick={handleModifyClick}>
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => deleteTodo(todoItem.id)}
          >
            삭제
          </button>
        </div>
      ) : (
        <div className={styles.btnContainer}>
          <input
            data-testid="modify-input"
            value={modifiedTodo}
            onChange={(e) => setModifiedTodo(e.target.value)}
          />
          <button data-testid="submit-button" onClick={handleSubmitClick}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={handleCancelClick}>
            취소
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoListChange;
