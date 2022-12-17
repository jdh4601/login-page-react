import React, { createContext, useState } from 'react';

const AuthContext = createContext({}); // context 객체 생성

export const AuthProvider = ({ children }) => {
  // value = (auth, setAuth) value가 변할 때 리렌더링
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
