import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from './api/axios';

const LOGIN_URL = '/auth';

function Login() {
  const { setAuth } = useContext(AuthContext);
  // ref 객체 생성
  const userRef = useRef();
  const errRef = useRef();
  // user state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    userRef.current.focus(); // DOM API focus() 호출, 선택한 DOM 요소
  }, []);

  useEffect(() => {
    setErrMessage('');
  }, [username, password]);

  // access axios
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // axios.post : 새로운 리소스 생성하기
      const res = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data));
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      setAuth({ username, password, roles, accessToken });
      setSuccess(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      if (!err?.res) {
        setErrMessage('No server response!');
      } else if (err.res?.status === 400) {
        setErrMessage('Missing username or password');
      } else if (err.res?.status === 401) {
        setErrMessage('Unauthorized');
      } else {
        setErrMessage('Login failed!');
      }
      errRef.current.focus();
      console.log(errRef.current);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/home">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMessage ? 'errmsg' : 'offscreen'}>
            {errMessage}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              ref={userRef}
              onChange={e => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              ref={userRef}
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>SIGN IN</button>
          </form>
          <p>
            Need an Account? <br />
            <span className="line">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
