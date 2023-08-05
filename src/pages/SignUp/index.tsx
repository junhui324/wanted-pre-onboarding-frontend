import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import * as Fetcher from '../../apis/Fetcher';
import { getToken } from '../../apis/Token';
import styles from './SignUp.module.scss';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate(ROUTES.TODOLIST);
    }
  }, []);

  const isValidEmail = (email: string): boolean => {
    return email.includes('@');
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSignupBtnClick = async () => {
    try {
      const res = await Fetcher.signUp({ email, password });
      navigate(ROUTES.SIGNIN);
    } catch (err) {
      alert('해당 이메일을 사용할 수 없습니다.');
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>회원가입</h2>
      </div>
      <div className={styles.input}>
        <span>이메일</span>
        <input
          data-testid="email-input"
          type="text"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={handleEmailChange}
        ></input>
      </div>
      <div className={styles.input}>
        <span>비밀번호</span>
        <input
          data-testid="password-input"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </div>
      <div className={styles.btnContainer}>
        <button
          data-testid="signup-button"
          onClick={handleSignupBtnClick}
          disabled={!isValidEmail(email) || !isValidPassword(password)}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUp;
