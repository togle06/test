import React, { useEffect, useState } from 'react';
import Login from './Login';
import Main from './Main';
import MainApp from './MainApp';
// import { Container,Nav,Navbar,NavDropdown  } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App () {
 // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false)
 
  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      
      console.log('isLogin1 ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin2 ?? :: ', isLogin)
    }
  })

  return (
    <div>


      {isLogin ? 
        <Main isLogin={isLogin}/>
        : 
        <Login />
      }
      
    </div>
  )
}
 
export default App;
