import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import * as Fetcher from '../../apis/Fetcher';
import { setToken, getToken } from '../../apis/Token';
import styles from './SignIn.module.scss';

function SignIn() {
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

  const handleSigninBtnClick = async () => {
    try {
      const res = await Fetcher.signIn({ email, password });
      setToken(res.access_token);
      navigate(ROUTES.TODOLIST);
    } catch (err) {
      alert('로그인에 실패하였습니다.');
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>로그인</h2>
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
          data-testid="signin-button"
          onClick={handleSigninBtnClick}
          disabled={!isValidEmail(email) || !isValidPassword(password)}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default SignIn;
