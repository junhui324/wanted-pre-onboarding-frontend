import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import styles from './Main.module.scss';

function Main() {
  const navigate = useNavigate();

  const handleSignupBtnClick = () => {
    navigate(ROUTES.SIGNUP);
  };

  const handleSigninBtnClick = () => {
    navigate(ROUTES.SIGNIN);
  };

  const handleTodoListBtnClick = () => {
    navigate(ROUTES.TODOLIST);
  };

  return (
    <div className={styles.container}>
      <h2>메인페이지</h2>
      <button onClick={handleSignupBtnClick} className={styles.btn}>
        회원가입
      </button>
      <button onClick={handleSigninBtnClick} className={styles.btn}>
        로그인
      </button>
      <button onClick={handleTodoListBtnClick} className={styles.btn}>
        투두리스트
      </button>
    </div>
  );
}

export default Main;
