import './App.css';

// import { Container,Nav,Navbar,NavDropdown  } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect  }  from 'react';


// import Idti from './Idti';
import index from './index';
// import DataGridEvent from './DataGridEvent';

// import DataGridReact from './DataGridReact';
// import VisitorMain from './VisitorMain';
// import Visitor_1 from './Visitor_1';
// import Visitor_2 from './Visitor_2';
import Visitor_3 from './Visitor_3.js';
// import Visitor from './Visitor';
import MainApp from './MainApp';
// import DataVisitor from './DataVisitor';
// import DataUpjang from './DataUpjang';

// import DataVisitortotal from './DataVisitortotal';

// import fileupload from './fileupload.js';
// import picture1 from './img/logo1.png';
// import picture2 from './img/PIXNIO-2653294-4032x3024.jpg';
// import SawonReg from './SawonReg';
import { useNavigate } from "react-router-dom";

function Main(props) {
const [key, setKey] = useState('home');
const isLogin = props.isLogin
const navigate = useNavigate();
useEffect(() => {
  navigate("/MainApp");

}, []);

   
  // render() {
    return (
      <div className="Main">
   
        {/* <Navbar bg="dark" variant="dark" className ='nav' style={{  width: '100%', height: '100%', marginLeft: 0, marginRight: 0 }} >
          <Container style={{  width: '100%', height: '100%', marginLeft: 10, marginRight: 0 }}>
              <Navbar.Brand href="home">씨엠아이엔씨</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="home">홈</Nav.Link>
                <Nav.Link href="VisitorMain">회사소개</Nav.Link>
                <Nav.Link href="Visitor_2">솔루션</Nav.Link>          
                <Nav.Link href="Visitor_3">레포트</Nav.Link>          
                <Nav.Link href="MainApp">MainApp</Nav.Link>         
                <NavDropdown title="기초코드" id="basic-nav-dropdown">
                  <NavDropdown.Item href="Visitor_1">그룹관리</NavDropdown.Item>
                  <NavDropdown.Item href="#1/3.2">
                  </NavDropdown.Item>
                  <NavDropdown.Item href="fileupload">fileupload</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="Visitor">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
          </Container>
        </Navbar> */}

        <Routes>
          <Route  exact  path="/home" element={<index/>}/>
          {/* <Route  exact  path="/VisitorMain" element={<VisitorMain/>}/> */}
          {/* <Route  exact  path="/DataGridEvent" element={<DataGridEvent/>}/> */}
          <Route  exact  path="/Visitor_3" element={<Visitor_3/>}/>
          {/* <Route  exact  path="/Visitor_2" element={<Visitor_2/>}/>
          <Route  exact  path="/Visitor_1" element={<Visitor_1/>}/>          
          <Route  exact  path="/fileupload" element={<fileupload/>}/>      
          <Route  exact  path="/Visitor" element={<Visitor/>}/>     */}
          <Route  exact  path="/MainApp" element={<MainApp/>}/>  
          {/* <Route  exact  path="/DataGridReact" element={<DataGridReact/>}/>  
          <Route  exact  path="/DataVisitor" element={<DataVisitor/>}/>  
          <Route  exact  path="/DataUpjang" element={<DataUpjang/>}/>             */}
          
        </Routes> 


      </div>

    );

  // }
}

export default Main;
