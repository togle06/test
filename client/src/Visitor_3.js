import { Form ,Col,Row ,Button,Container ,ModalDialog ,Modal  } from 'react-bootstrap';
import React, { useState, useEffect ,useRef }  from 'react';
import MaterialTable from 'material-table';
import { Alert, ThemeProvider, createTheme } from '@mui/material';
// import { CsvBuilder } from 'filefy';
import axios from 'axios';
// import { useDispatch,useSelector } from 'react-redux';
// import { useQuery } from "react-query";
// import { PieChart } from 'react-minimal-pie-chart';
// import { DefaultizedPieValueType } from '@mui/x-charts';
// import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import DatePicker from 'react-datepicker';
import './datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
// import { ko } from 'date-fns/esm/locale'; // 한국어 변환
import { useNavigate  } from "react-router-dom";
//////////////////////////////////

const Gip1 = "http://192.168.101.40:3005/"


const data = [
    { label: 'Group A', value: 400, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
    { label: 'Group C', value: 300, color: '#FFBB28' },
    { label: 'Group D', value: 200, color: '#FF8042' },
  ];
  
  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  
//   const getArcLabel = (params: DefaultizedPieValueType) => {
//     const percent = params.value / TOTAL;
//     return `${(percent * 100).toFixed(0)}%`;
//   };
////////////////////////////////////
const col1  = [
    { title: "날자", field: "INTIME" , width: "10%"  },
    { title: "조식", field: "A1" ,width: "3%" },
    { title: "금액", field: "A1_O" ,width: "5%"  },
    { title: "중식", field: "A2" ,width: "3%"},
    { title: "금액", field: "A2_O" ,width: "5%"},
    { title: "석식", field: "A3" ,width: "3%"},
    { title: "금액", field: "A3_O" ,width: "5%" },
    { title: "합계", field: "A4" ,width: "3%"},
    { title: "금액", field: "A4_O" ,width: "5%" },
]


const col2  = [
    { title: "날자", field: "INTIME" , width: "10%"  },
    { title: "조간식", field: "A1" ,width: "5%" },
    { title: "금액", field: "A1_O" ,width: "5%" },
    { title: "간식", field: "A2" ,width: "3%"},
    { title: "금액", field: "A2_O" ,width: "5%" },
    { title: "야식", field: "A3" ,width: "3%"},
    { title: "금액", field: "A3_O" ,width: "5%" },
    { title: "합계", field: "A4" ,width: "3%"},
    { title: "금액", field: "A4_O" ,width: "5%" },
]

const Visitor_3 = () => {
    const [date1, setdate1] = useState('20210104');
    const [date2, setdate2] = useState('20210304');
    const [date3, setdate3] = useState(1);
    const [nowdate, setnowdate] = useState('');
    const newdate = useRef("");
    const totdata = useRef("");
    const totdata1 = useRef("");
    const [totdatasu, settotdatasu] = useState('');
    const [totdatamoney, settotdatamoney] = useState('');
    const [selectedDate, setSelectedDate] =  useState(new Date());
    const [selectedDate1, setSelectedDate1] =  useState(new Date());
    const [selectedDate2, setSelectedDate2] =  useState(new Date());

    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);


    const [tableDatatotal, settableDatatotal] = useState("");

    const defaultMaterialTheme = createTheme();
    // const defaultMaterialTheme1 = createTheme();
//////////////////////////////////////////////
    useEffect(() => {

       
        const today = new Date();

        let formattedDate = today.getFullYear() +
		 ( (today.getMonth()+1) <= 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+
	     ( (today.getDate()) <= 9 ? "0" + (today.getDate()) : (today.getDate()) );
    
        axios.post(Gip1 + 'Usp_TotalHap',
        {
            date1 : formattedDate
        }
        )
        .then(response => {

            settableDatatotal(response.data)
            // console.log('useEffect',response.data)
            // console.log('useEffectA7',response.data[0].A7)
            // console.log('useEffectA7_O',response.data[0].A7_O)

            settotdatasu(response.data[0].A7);
            settotdatamoney(response.data[0].A7_O);
        })
        .catch(()=>{
            settableDatatotal([""]);
            settotdatasu("0");
            settotdatamoney("0");    
            console.log('useEffect실패')
        }); //요청이 실패했을 때    

    }, []);
/////////////////////////////////////////////////////////
const navigate = useNavigate();
const handleClick = () => {


    // alert("11112333")
     navigate("/MainApp");
    // const USERID = GGROUPID;
    // axios.post("http://192.168.101.43:3005/delete", {
    //     USERID: USERID
    // })
    // .then((response) => {
    //     console.log(response);
    // });

  }
/////////////////////////////////////////////////////////
  const css = {
    width: 250,
    height: 30,
    // backgroundColor: "tomato",
    // marginbottom: 15,
    textdecorationline: "underline",
    color: 'blue',
    fontSize: 20,
  };
  

  const css1 = {
    width: 500,
  };
  const css3 = {
    width: 130,
    height: 10,
    // backgroundColor: "tomato",
    margin: 10,
    fontSize: 17,

  };
  const css4 = {
    width: 80,
    height: 10,
    // backgroundColor: "tomato",
    // margin: 0,
    fontSize:25,
    color: 'red',
  };
  const css5 = {
    width: 200,
    height: 30,
    // backgroundColor: "tomato",
    // margin: 10,
    fontSize:25,
    border: "none",
    background: "transparent"
  };
  const css6 = {
    width: 130,
    height: 30,
    // backgroundColor: "tomato",
    // margin: 0,
    fontSize:22,
    color: 'red',
  };


  const css7 = {
    width:200,
    // height: 10,
    // backgroundColor: "tomato",
     margin : (0, 0, 5, 5),
     fontSize:18,
     color: 'red',
  };


  const css8 = {
    fontSize:20,
    margin : (0, 0, 0, 10)

  };
  const [isShow, setIsshow] = useState(false);


const onShow = () => {
    if (isShow ===true)
    {
     
        setIsshow(false);
    }
    else
    {
        setIsshow(true);
        // setaa1("aaaaaaa");

        db_proc(1)
    }
};
    //////////////////////////////
    const [isShow1, setIsshow1] = useState(false);
    const onShow1 = () => {
      if (isShow1 === true)
      {
          
          setIsshow1(false);
      }
      else
      {
          setIsshow1(true);
        //   setdate3(2);

          db_proc(2)
      }
    };

//////////////////////////////////    
const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}
const formattedDate = (data) => {
    let formattedDate1 = data.getFullYear() +
    ( (data.getMonth()+1) <= 9 ? "0" + (data.getMonth()+1) : (data.getMonth()+1) )+
    ( (data.getDate()) <= 9 ? "0" + (data.getDate()) : (data.getDate()) );
    return formattedDate1;
}
// const formattedDate = (data) => {
// let nowdate = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
// }
//////////////////////////////////
    const db_proc = (e) => {

        // let formattedDate1 = selectedDate1.getFullYear() +
        // ( (selectedDate1.getMonth()+1) < 9 ? "0" + (selectedDate1.getMonth()+1) : (selectedDate1.getMonth()+1) )+
        // ( (selectedDate1.getDate()) < 9 ? "0" + (selectedDate1.getDate()) : (selectedDate1.getDate()) );
        // let formattedDate2 = selectedDate2.getFullYear() +
        // ( (selectedDate2.getMonth()+1) < 9 ? "0" + (selectedDate2.getMonth()+1) : (selectedDate2.getMonth()+1) )+
        // ( (selectedDate2.getDate()) < 9 ? "0" + (selectedDate2.getDate()) : (selectedDate2.getDate()) );
        let fDate1 = formattedDate(selectedDate1 ) 


        let lDate1 = formattedDate(selectedDate2 ) 

        axios.post(Gip1 + 'Foodproc',
        {
            e,
            date1 : fDate1 ,
            date2 : lDate1
        }
        )
        .then(response => {
                console.log('db_proc',response);
                if (e === 1)
                {
              
                    setTableData(response.data)
                    console.log('db_proc1',tableData);
                }
                else if (e === 2)
                {
                    setTableData1(response.data)
                    console.log('db_proc2',tableData1);
                }
                

               

        //                employees.push(response)
        })
        .catch(()=>{
            console.log('db_Change실패')
        }); //요청이 실패했을 때    

    };
    // const onChange = (e) => {
    //     const value = e.target.value;
    //     // const id = e.target.id;
    //     // setdate4( e.target.value) ;
    //     Alert(value)
    // }

    const db_proc_total = (e) => {


        // let formattedDate = e.getFullYear() +
		//  ( (e.getMonth()+1) < 9 ? "0" + (e.getMonth()+1) : (e.getMonth()+1) )+
	    //  ( (e.getDate()) < 9 ? "0" + (e.getDate()) : (e.getDate()) );
         let fDate = formattedDate(e ) 
         

        axios.post(Gip1 + 'Usp_TotalHap',
        {
            date1 : fDate
        }
        )
        .then(response => {
         
            settableDatatotal(response.data)
            //    console.log('db_proc_total',response.data)
            //    console.log('db_proc_totalA7',response.data[0].A7)
            //    console.log('db_proc_totalA7_O',response.data[0].A7_O)
            settotdatasu(response.data[0].A7);
            settotdatamoney(response.data[0].A7_O);
        })
        .catch(()=>{
            
            settableDatatotal([""]);
            settotdatasu("0");
            settotdatamoney("0");            
            console.log('db_proc_total실패')
        }); //요청이 실패했을 때    
  

    };


    // 시작 시간
    const [startTime, setStartTime] = useState(null);
    // 종료 시간
    const [endTime, setEndTime] = useState(null);
    // 시작 시간을 선택했는지
    const [isSelected, setIsSelected] = useState(false);
    
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
        setEndTime(null);
    };

  return (
    <>
 
    <div className="Main"  align="left" style={{  width: '100%', height: '100%' }}>
        <Container className="panel" align="left">
            <div class="card" >
                <div class="card-header">
                    메인 메뉴
                </div>
                <Form>
                    <div style={css3} >

                    </div>

             
                        <label for="group" style={css6} >&nbsp;   조회일자  </label>
                            <DatePicker  className='example-custom-input'
                                dateFormat='yyyy.MM.dd' // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                                maxDate={new Date('2777-12-01')} // maxDate 이후 날짜 선택 불가
                                selected={selectedDate}
            
                                // value={tableDatatotal}

                                //  onChange={ (date) => {setSelectedDate(date) }}
                                 onChange={ (date) => {setSelectedDate(date) ; db_proc_total(date); console.log("SelectedDate",date);console.log("date",date);}}                                 
                               // locale={ko}
                                showPopperArrow = {true}
                                
                            />

                    <div  >

                    </div>
                    <Form.Group as={Row} className="mb-0" controlId="formPlaintext">        
                        <div Class = "group"  mb-3 g-3  align="left"  >
                        <label for="group" style={css4} >&nbsp;  수량</label>
                            <input  type ="text" clase = "control-label" id = 'totalsu' size="15"  
                            style={css5}  disabled     value={ addComma(totdatasu )  } />
                        </div>    
                    </Form.Group>  
                    <Form.Group as={Row} className="mb-0" controlId="formPlaintext">        
                        <div Class = "group"  mb-3 g-3  align="left"  >
                        <label for="group" style={css4} >&nbsp;  금액</label>
                            <input  type ="text" clase = "control-label" id = 'totalMoney' size="15"  
                            style={css5}  disabled     value={ addComma(totdatamoney)   } />
                        </div>    
                    </Form.Group>  
                    {/* npm uninstall @mui/x-charts --force */}
                    {/* <PieChart
                        series={[
                            {
                            outerRadius: 80,
                            data,
                            arcLabel: getArcLabel,
                        
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontSize: 14,
                            },
                        }}
                        {...sizing}
                    />

                    <PieChart
                        series={[
                            {
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            data,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                            },
                        }}
                        {...sizing}
                        /> */}
                    
                </Form>
     
                <div style={css3} >
              
                </div>

                <div >
                    <div >
                            <div style={css8}>
                                <label for="group" style={css7} >   일자별 일별 조회(FROM)  </label>
                                <DatePicker    className='example-custom-input1'
                                    dateFormat='yyyy.MM.dd' // 날짜 형태
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                                    maxDate={new Date('2777-12-01')} // maxDate 이후 날짜 선택 불가
                                    selected={selectedDate1}
                                    onChange={ (date) => {setSelectedDate1(date) ; console.log("SelectedDate",date);console.log("date",date);}}
                                   // locale={ko}
                                    showPopperArrow = {true}
                                  
                                />
                            </div >
                            <div style={css8}>
                                <label for="group" style={css7} >   일자별 일별 조회(TO)  </label>
                                <DatePicker    className='example-custom-input1'
                                    dateFormat='yyyy.MM.dd' // 날짜 형태
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                                    maxDate={new Date('2777-12-01')} // maxDate 이후 날짜 선택 불가
                                    selected={selectedDate2}
                                    onChange={ (date) => {setSelectedDate2(date) ;  console.log("SelectedDate",date);console.log("date",date);}}
                                   // locale={ko}
                                    showPopperArrow = {true}
                                    

                                />
                            </div >
                            <div style={css8}>
                                <label for="group" style={css7} >   일별  </label>
                                <DatePicker    className='example-custom-input1'
                                    width = "20px"
                                    height = "40px"
                                    selected={startTime}
                                    onChange={onSelect}
                                  //  locale={ ko }
                                    dateFormat="aa h:mm"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    timeIntervals={10}
                                    // minTime={new Date()}
                                    // maxDate={setHours(setMinutes(new Date(), 0), 17)}
                                    // selected={selectedDate2}
                                    // onChange={ (date) => {setSelectedDate2(date) ;  console.log("SelectedDate",date);console.log("date",date);}}
                                    // locale={ko}
                                    // showPopperArrow = {true}
                                    

                                />
                                                            <DatePicker    className='example-custom-input1'
                                                selected={startTime}
                                                onChange={onSelect}
                                   //             locale={ ko }
                                    dateFormat="aa h:mm"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    timeIntervals={10}
                                    // minTime={new Date()}
                                    // maxDate={setHours(setMinutes(new Date(), 0), 17)}
                                    // selected={selectedDate2}
                                    // onChange={ (date) => {setSelectedDate2(date) ;  console.log("SelectedDate",date);console.log("date",date);}}
                                    // locale={ko}
                                    // showPopperArrow = {true}
                                    

                                />
                            </div >
                            
                    </div>
          
                    <div>
                    <label for="scales"  style={css7}  > </label>     
                    </div>
                    
                    {/* style={css} */}
                    <label for="scales"  style={css}  onClick={onShow}>&nbsp;  일자별 매출현황(식사)     </label>
                    {isShow === true ? 
                        <div >
                            <Form>
                           
                                    {/* <Form.Group as={Row} className="mb-2" controlId="formPlaintext">        
                                        <div style={css1} Class = "form1"  mb-3 g-3  align="left" >
                                            <label for="username" calss="control-label" col-sm-5>&nbsp; &nbsp; 1111 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
                                            <input type ="text" clase = "control-label" id = 'USERNAME' size="15"      value={ aa1 }
                                            ></input>
                                        </div>    
                                    </Form.Group>  
                                    <Form.Group as={Row} className="mb-2" controlId="formPlaintext">        
                                        <div style={css1} Class = "form1"  mb-3 g-3  align="left" >
                                            <label for="username" calss="control-label" col-sm-5>&nbsp; &nbsp; 2222 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
                                            <input type ="text" clase = "control-label" id = 'USERNAME' size="15"   value={ aa2 }
                                            ></input>
                                        </div>    
                                    </Form.Group>   */}


                                <Form.Group as={Row} className="mb-2" controlId="formPlaintext">  
                                    <div class="col-4" align="center"  style={{ width: '100%', height: '100%' }} >     
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <MaterialTable
                                                
                                                columns={col1}
                                                data={tableData}
                                                title=""
                                                // onSelectionChange={(event,rowData) => {
                                                    //  console.log('rowDataGroup',rowData)
                                                //     console.log('event',event)
                                                //     setUser(event);

                                                // }}
                                                options={{ selection: false,exportButton:false,exportAllData:false
                                                    , paging: true, pageSizeOptions: [ 5, 10, 20, 25, 50, 100], pageSize: 10,
                                                    cellStyle: {
                                                        width: 50,
                                                        minWidth: 100,
                                                      },
                                                      headerStyle: {
                                                        width: 50,
                                                        minWidth: 100,
                                                      },
                                                }}

                                            />
                                        </ThemeProvider>
                                    </div>
                                </Form.Group>  
                            </Form>
                        </div> 
                        : null
                    }
                </div>

                <div style={css8} >
                </div>

                <div>
                {/* style={css} */}

                {/* style={css}  */}
                    <label for="scales"  style={css}   onClick={onShow1}>&nbsp;  일자별 매출현황(간식)   &nbsp;  &nbsp;  </label>
                    {isShow1 === true ? 
                        <div >
                            <Form>
                            <Form.Group as={Row} className="mb-2" controlId="formPlaintext1">  
                                    <div class="col-5" align="center"  style={{ width: '100%', height: '100%' }} >     
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <MaterialTable
                                                columns={col2}
                                                data={tableData1}
                                                title=""
                                                // onSelectionChange={(event,rowData) => {
                                                    //  console.log('rowDataGroup',rowData)
                                                //     console.log('event',event)
                                                //     setUser(event);

                                                // }}
                                                options={{ selection: false,exportButton:false,exportAllData:false
                                                    , paging: true, pageSizeOptions: [ 5, 10, 20, 25, 50, 100], pageSize: 10,
                                                    cellStyle: {
                                                        width: 50,
                                                        minWidth: 100,
                                                      },
                                                      headerStyle: {
                                                        width: 50,
                                                        minWidth: 100,
                                                      },
                                                }}

                                            />
                                        </ThemeProvider>
                                    </div>
                                </Form.Group>  

                                   
                            </Form>

                        </div> 
                        : null
                    }
                </div>
            </div>
            <div class="col-auto">
                         <button type="button" class="btn btn-primary mb-2"  style={{ width: '30%', height: '100%' ,margin: '30px' ,top: '40%' ,right: '100%' }}  onClick={() => handleClick()}>HOME</button>
            </div>
        </Container >

    </div>

    </>
  );
};
 
export default Visitor_3;