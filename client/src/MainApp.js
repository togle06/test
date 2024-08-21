import './App.css';
// import './Abutton.css';
import React,{ useEffect, useState } from 'react';
import { Form ,Row ,Container   } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 import { AddAlarmOutlined } from '@mui/icons-material';



function MainApp(props) {
  const Items = {
    data: [{
        name: '아메리카노',
        taste: '쓴 맛',
        type: ['아이스', '핫']
    }, {
        name: '라떼',
        taste: '고소한 맛',
        type: ['아이스', '핫']
    }, {
        name: '말차라떼',
        taste: '달콤한 맛',
        type: ['아이스']
    }]
}

const css4 = {
  width: 80,
  height: 30,
  // backgroundColor: "tomato",
  // margin: 0,
  fontSize:25,
  color: 'red',
};
const [key, setKey] = useState('home');
const isLogin = props.isLogin
const [DbData, setDbData] = useState([])
const [subgroupid, setsubgroupid] = useState([])
const [datalabel, setdatalabel] = useState([])
const [OPTIONS, setOPTIONS] = useState([])

const [strdataValue, setstrdataValue] = useState("");
const [groupid, setgroupid] = useState("");
// const [subgroupid, setsubgroupid] = useState("");
const navigate = useNavigate();


const [groupcount, setgroupcount] = useState(0);

const [isShow, setIsshow] = useState(false);
let strdata = ""
const Gip1 = "http://192.168.101.40:3005/";
//////////////////////////////
useEffect(() => {
  const groupid = "10000001"

  console.log('groupid',groupid);
  axios.post(Gip1 + "DbSerch",
  {
    groupid
  }
  )
  .then(response => {
    
          setDbData(response.data)
          setOPTIONS(response.data)

          // response.data.map((rank, i, ) => {
          //   if (i + 1 === response.data.length) {
          //     strdata =  strdata +  a.label 
          //   } else {
          //     strdata =  strdata +  a.label + ":" 
          //   }
          // })
          let i = 1
          console.log('db_serch',response.data )
          response.data.map(function(a){
            // setdatalabel(a.label)
           
            if ( i === response.data.length) {
              strdata   +=  a.label1 
            } else {
              console.log('db_serch',a.label1 )
              strdata   +=  a.label1 + ":" 
            }
            i = i + 1
          });

          // const obj = JSON.parse(response.data);
          console.log('db_serch',strdata);
          setstrdataValue(strdata)
          // console.log('db_serch',obj.value);
          // console.log('db_serch1',obj.label);
          setgroupcount(response.data.length)

          if  (response.data.length === 1 || response.data.length === 0)
          {
            console.log('db_serch false:',response.data.length)
            setIsshow(false);
          }
          else
          {
            console.log('db_serch TRUE:',response.data.length)
            setIsshow(true);
            
          }

  //                employees.push(response)
  })
  .catch(()=>{
      console.log('DbSerch실패')
  }); //요청이 실패했을 때    
}, []);


const db_Change = (e) => {

  setgroupid('10000001')
  console.log('setgroupid',groupid);
  console.log('setsubgroupid',subgroupid);
  axios.post(Gip1 + "DbChange",
  {
      groupid,subgroupid
  }
  )
  .then(response => {
          console.log('response',response);
          setDbData(response.data)



  //                employees.push(response)
  })
  .catch(()=>{
      console.log('db_Change실패')
  }); //요청이 실패했을 때    

}
const handleChange = (e) => {
  // setSelectedValue(e)
  setsubgroupid(e)
  console.log('select',subgroupid)
  db_Change()

}
// data : OPTIONS12
const handleClick1 = () => {
  axios.post(Gip1 + "aaaaa",
  {
     data: "aaaaaaaaaaaaaaaaaaaaa",
     data1: "aaaaaaaaaaaaaaaaaaaaa"
  }
  )
  .then(response => {
     
             console.log('handleClick1',response.data )
  })
  .catch(()=>{
      console.log('handleClick1 Group실패ㅜㅜ')
  });
  // let form = new FormData()
  // form.append('id', "12345678")
  // form.append('pwd',"aaaaaaa")
  
  // console.log(Object.entries(Items))
  // axios.post(`http://192.168.101.49:5678/aaaaa`,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  //   .then( response => {
  //     console.log('response : ')
  //     // console.log('response : ', JSON.stringify(response, null, 2))
  //   }).catch( error => {
  //     console.log('failed', error)
  //   })

}
const handleClick2 = () => {
  const data = { my_name: "pepe", age: 21 };
  //const data ="1111111111111111111111111111"
  const headers = { "X-Requested-With": "XMLHttpRequest" };
  // let form = new FormData()
  // form.append('id', "12345678")
  // form.append('pwd',"aaaaaaa")
  
  // console.log(Object.entries(Items))
  axios.post(Gip1 + "BARCODE",
  data,
  // { my_name: "pepe", age: 21 },
  {
    headers,
  }


  )
   .then( response => {
      console.log('response : ')
      // console.log('response : ', JSON.stringify(response, null, 2))
    }).catch( error => {
      console.log('failed', error)
    })

}
const handleClick = (e) => {
  // alert(e)
//  <Visitor_2 />
  // navigate("/Visitor_2");

  // navigate("/Visitor_2");
  switch (e) {
    case "1":
    navigate("/Visitor_3");
    break;
    case "2":
      navigate("/Visitor_1");
      break;
    case "3":
      navigate("/Visitor");
    break;

    case "4":
      navigate("/DataVisitor");
    break;

    case "5":
      console.log('strdata',strdataValue)
    navigate("/DataUpjang", {
      state: {
        strdata: strdataValue
                       
      }

  });


    break;
            
    default:

  }
}
  // render() {




    return (



       <div className="Main"  align="center" style={{  width: '100%', height: '100%' }}>
           <Container className="panel" align="center">
            <div class="card" >

            {isShow === true ? 
  
              <Form.Group as={Row} className="mb-2" controlId="formPlaintext">
                  <div style={css4} >

                  </div>
                  <label align = "left"  width = "100%" padding= "10px 10px">자회사선택 &nbsp; &nbsp; &nbsp;

                      <select 
                      // styles={customStyles}
                        className="TELOFF"
                              
                      onChange={(e) => handleChange(e.target.value)}
                
                      // value={OPTIONS.filter(function (option) {
                      //     // GTELOFF = selectedValue;
                      //     return option.value === selectedValue;
                          
                      // })}
                      >
                          {OPTIONS.map((option) => (
                              <option
                                  key={option.value}
                                  value={option.value}
                              >
                                  {option.label}
                                  
                              </option>
                          ))}
                      </select>
                  </label>

              </Form.Group>
            : null
            }

              <div class="card-header">
                  메인 메뉴
              </div>
              
              <body>

              <div>
                  
                <button type="button" class="btn btn-primary mb-2"  style={{ margin: '1em' ,width: "8em",height: "8em"}}  onClick={() => handleClick("1")}>다음</button>
                <button type="button" class="btn btn-primary mb-2"  style={{ margin: '1em' ,width: "8em",height: "8em" }}  onClick={() => handleClick("2")}>다음</button>
                </div>  
                <div>
                <button type="button" class="btn btn-primary mb-2"  style={{ margin: '1em' ,width: "8em",height: "8em"}}  onClick={() => handleClick("3")}>다음</button>
                <button type="button" class="btn btn-primary mb-2"  style={{ margin: '1em' ,width: "8em",height: "8em"}}   onClick={() => handleClick("4")}>다음</button>
                </div>
                <button type="button" class="btn btn-primary mb-2" style={{ margin: '1em' ,width: "18em",height: "8em"}}   onClick={() => handleClick("5")}>다음</button>
                <button type="button" class="btn btn-primary mb-2" style={{ margin: '1em' ,width: "18em",height: "8em"}}   onClick={() => handleClick1()}>다음</button>
                <button type="button" class="btn btn-primary mb-2" style={{ margin: '1em' ,width: "18em",height: "8em"}}   onClick={() => handleClick2()}>다음</button>
                  

              </body> 

            </div>
          </Container>
       </div> 
    );

  // }
}

export default MainApp;
