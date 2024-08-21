
const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
// const { sql,  Config } = require('./src/config/db');
const axios = require('axios');
const cors = require('cors');
const io = require("socket.io-client");
const Control = require('./src/Control');

const formidable = require('formidable');
const path = require("path");
const publicPath = path.join(__dirname, "public");
const multer = require("multer");
const uuid4 = require("uuid4");

const fs = require('fs')
// let data1 = [{ id: '123456789' }];
let Gsabun = [""];
let Gpwd = [""];

const sql = require('mssql');
require('dotenv').config();

const Gserver = "";
const Gport = 1433;
const GDB_DATABASE = "";
const GDB_USER = "";
const GDB_PASSWORD = "";


//module.exports = db;
// module.exports = {
//   sql, config
// }

const port =  8001; //process.env.PORT || 3005 ;
// ${process.env.PORT}
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});


const config = {
    server:  process.env.DB_HOST,
    port: 7780,
    options: { encrypt:false, database: process.env.DB_DATABASE },
    authentication:{
        type:"default",
        options:{
            userName:process.env.DB_USER,
            password:process.env.DB_PASSWORD
        }
    }
};
sql.connect(config, function(err){
    if(err){
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
})

const db_Change = (e) => {
    const config1 = {
        server:  process.env.DB_HOST,
        port: 1433,
        options: { encrypt:false, database: e },
        authentication:{
            type:"default",
            options:{
                userName:process.env.DB_USER,
                password:process.env.DB_PASSWORD
            }
        }
    };
    console.log('MSSQL',config1)
    sql.connect(config1, function(err){
        if(err){
            return console.error('error : ', err);
        }
        console.log('MSSQL 연결 완료')
    })
};


app.use(bodyparser.urlencoded({extended: false}));

app.use(bodyparser.json());
app.use(express.static(__dirname +'/'));
// app.use(express.static(__dirname +'cmfood/build'));


//app.use(express.json());

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))

//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true }));


///////////////////////////////////////////
// app.get('/', function (요청, 응답) {
//     응답.sendFile(path.join(__dirname, '/cmfood/build/index.js'));
//   });

// const onAddDetailDiv = (function() {
//         axios.get('/controller1')
//         .then(response => {
//                  console.log("response",response)
//                 // setUser(response);
//                 //empList.push(response)
//                 // setTableData(response)
//                 // empList = response
//         .catch(()=>{
//             console.log('controller실패ㅜㅜ')
//         }); //요청이 실패했을 때    
//         });
//     })

///////////////////////////////////////////////////////

app.post('/Foodproc', (req, res) => {
    var request = new sql.Request();
    request.stream = true;

    const resultbody = req.body;

    const date1 = resultbody.date1
    const date2 = resultbody.date2
    const date3 = resultbody.e


    q = "exec  Usp_D_PRESENT_L '" + date3 + "','" + date1 + "','" + date2 + "'";
    console.log('Foodproc',q);
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
//         console.log(recordset);
        return;
    });

    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        // console.log('Foodproc',result);
        res.send(result);
    });
    //res.send('aaaaaa');
})
//////////////
app.post('/TotalMoney', (req, res) => {
    var request = new sql.Request();
    request.stream = true;

    const resultbody = req.body;
    const date1 = resultbody.date1

    const date2 = resultbody.date2
    const date3 = resultbody.date3
    const date4 = resultbody.date4

    q = "exec  Usp_TotalDb '" + date2 + "','" + date3 + "','" + date4 + "'";
    console.log('TotalMoney',q);
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
//         console.log(recordset);
        return;
    });

    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        res.send(result);
    });

})
///////////////////////////////////////////////////////
app.post('/Usp_TotalHap', (req, res) => {
    var request = new sql.Request();
    request.stream = true;

    const resultbody = req.body;

    const date1 = resultbody.date1
    q = "exec  Usp_TotalHap '" + date1 + "'";
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
//         console.log(recordset);
        return;
    });

    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        console.log('Usp_TotalHap',result);
        res.send(result);
    });
    //res.send('aaaaaa');
})
//////////////////////////////////////////////////////////
app.post('/dbSerch', (req, res) => {
    var request = new sql.Request();
    request.stream = true;

    const resultbody = req.body;

    // user_id = resultbody.id
    // user_rid = resultbody.rid
    const group_id= resultbody.groupid

    q = "select  SubGroup_no as value,GName  as label, GDB_DATABASE  as label1  from TabDbDetail where Group_no = '" + group_id + "'";
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
//         console.log(recordset);
        return;
    });

    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        console.log('DbSerch',result);
        res.send(result);
    });
    //res.send('aaaaaa');
})
//////////////
app.post('/DbChange', (req, res) => {

    const resultbody = req.body;
    const groupid = resultbody.groupid
    const subgroupid = resultbody.subgroupid

    var rdata = '';
    
    var rdata1 = '';
    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    q1 = "select  * from TabDbDetail where Group_no = '" + groupid + "' and SubGroup_no = '" + subgroupid + "'";
    console.log('DbChange',q1);
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
        return;
    });

    var result_1 = [];
    request.on('error', function(){
        console.log(err); 
    })
    .on('row', (row) => {
        result_1.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].GDB_DATABASE;
            rdata1= result_1[0].GName;
            console.log('rdata',rdata);
            res.send(rdata1);
            db_Change(rdata)

        } catch (err) {
            rdata = 0;
            res.send('err');
            console.log('err')
        }
    });

})
////////////////////////////////////////////////////
    
    
app.get('/controller', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    q = 'select * from controller_tbl';
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
        // console.log(recordset);
        return;
    });
   
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        // console.log('controller1Getresult :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});
/////////////////////////////////////////////////

// app.post('/upload', (req, res) => {
//     var form = new formidable.IncomingForm();
	 	
//     form.parse(req, function(err, fields, files) {
//         var oldpath = files.file.path;
//         var newpath = 'F:/React/cmincFoodServer/public/images/' + files.file.name
//         console.log('req : ', files.file.name)
//         fs.rename(oldpath, newpath, function (err) {
//           if (err) throw err;
//           res.write('File uploaded and moved!');
//           res.end();
//         });
//       });

// })
/////////////////////////////////////////////////
app.post('/upload', async function(req, res, next) {
    try{
        var TableData = [];
        const query = req.query
       // console.log('req : ', req)
        //const form = formidable({multiples: true}) //한번에 여러개 파일 입력받아오는 것 허용
         const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err)
                return
            }
            // console.log('files : ', files)
            const file = files.image
            const dir = `public/images`
            !fs.existsSync(dir) && fs.mkdirSync(dir)
//            const newPath = path.join(__dirname,'..', `${dir}/${file.name}`) //__dirname : 현재경로 가져오기
            // const newPath = path.join(__dirname,'.', `${dir}/${query.user_idx}.jpg`) //__dirname : 현재경로 가져오기

            const newPath =  files.image[0].filepath;
            // console.log('files : ', __dirname);
            // console.log('file1111 : ', files.image[0].filepath);
            const newfile1 = __dirname + '\\public\\images\\' + files.image[0].originalFilename

            fs.copyFileSync(newPath,newfile1)
            fs.unlinkSync(newPath)

            res.json({result: newfile1})
            // res.json({result: `images/${query.user_idx}/${file.name}`})
        })

    }catch(err){
        console.log('err : ',err)
        next(err)
    }
})
////////////////////////////////////////////////
app.post('/controller1', (req, res) => {
    const user_id = req.query.id
    var rdata = '';
    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    q1 = "select * from controller_tbl where rid = '" + user_id + "'";
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });

    var result_1 = [];
    request.on('error', function(id){
        console.log(err); 
    })
    .on('row', (row) => {
        result_1.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].id;
            // console.log('rdata',result_1);
            res.send(result_1);
        } catch (err) {
            rdata = 0;
            res.send('err');
            console.log('err')
        }
    });

})

/////////////////////////////////////////////////
app.get('/controller1', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    q = 'select * from controller_tbl';
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
        // console.log(recordset);
        return;
    });
   
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        // console.log('controller1Getresult :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});

app.get('/Group', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    // value: '그룹', label
    q = 'select GROupcode as value ,Groupname as label  from [dbo].[Group]';
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
        // console.log(recordset);
        return;
    });
   
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        //  console.log('group :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});
///////////////////////////////////////////////////
app.post("/user41", (req, res) => {
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
 
    var edge = require("edge-js");
    var helloDll = edge.func({
        assemblyFile: "./CMINC.InOutControl.dll",
        typeName: "CMINC.InOutControl.clsFunction",
        methodName: "InsertID1",
      });

    var allProducts = jsonData.selectedRows.map(function (item) {
        return new getData(item);
    });
      
    function getData(data) {
        //this.productID = data.id;
        console.log(data.id);
        console.log(data.email);
        const strdate = data.id + ";" + data.email
        
        helloDll(strdate, function(error, result){
             if(error) throw error;
            // console.log("err",result);
          });
        }
    
    //   res.sendFile(__dirname + '/index.html')
   });
///////////////////////////////////////////////////////////////


app.post('/usertran_group', (req, res) => {

    const resultbody = req.body;

    // user_id = resultbody.id
    // user_rid = resultbody.rid
    const group_id= resultbody.id
    const user_ipaddr= resultbody.ipaddr
    var error_1 = ''
    // console.log('group_id :', group_id)
    // console.log('user_rid :', user_ipaddr)

    // 
    var result = [];
    // res.send({ok:true});
    var request = new sql.Request();
    request.stream = true;
    // group_id = '1';
    // q = " select bb.rdesc,bb.controllername ,aa.eventdate, aa.eventtime,aa.eventcode  from [dbo].[controller_tbl] bb inner join [dbo].[eventlog_tbl] aa   on aa.controllerid = bb.rid "
    q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun, \
    USERGUBUN, user_groupno, date1, date2 from CM_TabUSER where user_groupno = '" + group_id + "'" ;    
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error1 :',err);
        }
    });
   
    
    request.on('error', function(err){
        console.log('err', err); 
    })
    .on('row', (row) => {
        // console.log('row :', row);
        result.push(row);
    })
    .on('done', () => { // 마지막에 실행되는 부분
//////////////////////////////////////////////////////////////////
        const conSel = result.map((c) =>{
            const USERID1 =  c.USERID + "," + c.USERRF+ ",30001230" 
            // console.log('lee',USERID1)

            var edge = require("edge-js");
            var helloDll = edge.func({
                assemblyFile: "./CMINC.InOutControl.dll",
                typeName: "CMINC.InOutControl.clsFunction",
                methodName: "InsertID1",
                //methodName: "InsertID",
                
            });
            
            const strdate = user_ipaddr + ",1004," +   USERID1 
            helloDll(strdate, function(error, result1){
                if(error)
                {
                    error_1 = '1';                    
                    console.log('result0',result1);
                    return console.log('query error :',error)
                }
                else
                {
                    error_1 = '0';
                    
                    console.log('result1',result1);
                    // res.send(result1);
                }           
            });
            
        }) 
        console.log('error_1',error_1);
        res.send(error_1);
/////////////////////////////////////////////////////////////////
    });
   
})

 ///////////////////////////////////////////

app.post('/usertran1', (req, res) => {

    const resultbody = req.body;
    var rdata = '';
    // const jsonData = JSON.parse(resultbody);
    var request = new sql.Request();
    request.stream = true;

    var result_1 = [];

    // user_id = resultbody.id
    // user_rid = resultbody.rid
    const user_id= resultbody.id
    const user_ipaddr= resultbody.ipaddr
    const user_rid= resultbody.rid
    console.log('user_id :', user_id)
    console.log('user_rid :', user_ipaddr)

    // 

    // res.send({ok:true});

    // q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun,  \
    // USERGUBUN, user_groupno, date1, date2 from CM_TabUSER where USERName like '" + user_id + "'" ;    
    // request.query(q, (err, recordset) => 
    // {
    //     if(err)
    //     {
    //         return console.log('query error :',err)
    //     }
    //     else
    //     {
    //         console.log(recordset[0]); 
    //     }
    // });
    // var result = [];
    // request.on('error', function(err){
    //     console.log(err); 
    // })
    // .on('row', (row) => {
    //     result.push(row)
    // })
    // .on
    // ('done', () => { // 마지막에 실행되는 부분
    //     console.log('Getresult123 :', result)
    //     // res.render('list.ejs',{'posts' : result})
    //     res.send(result);
    // });

    
    var edge = require("edge-js");
    var helloDll = edge.func({
        assemblyFile: "./CMINC.InOutControl.dll",
        typeName: "CMINC.InOutControl.clsFunction",
        methodName: "InsertID1",
        //methodName: "InsertID",
        
      });
        const strdate = user_ipaddr + ",1004," +   user_id 
            console.log('strdate',strdate)
            helloDll(strdate, function(error, result){
            if(error)
            {
                return console.log('query error :',error)
                console.log('result',result);
            }
            else
            {
                console.log('query error :',error)
                console.log('result',result);
                res.send(result);
    //               console.log('strdate',strdate);
            }           
        });


        // console.log('result',result);
        // console.log('error',error);
    // var allProducts = jsonData.selectedRows.map(function (item) {
    //     return new getData(item);
    // });
      

    // function getData(data) 
    // {
    //     //this.productID = data.id;
    
    //     const strdate = user_id + ";" + user_rid
        
    //     helloDll(strdate, function(error, result){
    //          if(error) throw error;
    //       });
    // }


})


///////////////////////////////////////////////////
app.post("/usertran", (req, res) => {
    const result = req.body;
    var rdata = 0;
    //const jsonData = JSON.parse(JSON.stringify(result));
    const jsonData = JSON.parse(result);
    var request = new sql.Request();
    // var request1 = new sql.Request();    
    // var request2 = new sql.Request();    
    //req.query.user_id
    
    request.stream = true;
    // console.log("jsonData",jsonData );
    const newSelecteds = jsonData.map((n) =>{
        // console.log("jsonData1",n.rid );
    })
     //result.push(jsonData)
    //  res.send(1);

    // var edge = require("edge-js");
    // var helloDll = edge.func({
    //     assemblyFile: "./CMINC.InOutControl.dll",
    //     typeName: "CMINC.InOutControl.clsFunction",
    //     methodName: "InsertID1",
    //   });

    // var allProducts = jsonData.selectedRows.map(function (item) {
    //     return new getData(item);
    // });
      
    // function getData(data) {
    //     //this.productID = data.id;
    //     console.log(data.id);
    //     console.log(data.email);
    //     const strdate = data.id + ";" + data.email
        
    //     helloDll(strdate, function(error, result){
    //          if(error) throw error;
    //       });
    //     }
    //////////////////////////////////////
        var result_1 = [];
        request.on('error', function(GROupcode){
            console.log(err); 
        })
        .on('row', (row) => {
            result_1.push(row)
            //Rdata = row.id;
            
        })
        .on('done', () => { // 마지막에 실행되는 부분
            try {
                rdata = result_1[0].rid;
                console.log(rdata);
            } catch (err) {
                rdata = 0;
            }

            if (rdata == 0)
            {
                // var q = "insert into Group(GROupcode, Groupname) \
                // values( '" + jsonData.GROupcode + "','" + jsonData.Groupname + "')"
                // console.log('insert',q)
                // request1.query(q, (err, recordset) => {
                //     if(err){
                //         consnole.log('query error :', err);
                //     }
                //     else{
                //         try {
                //             res.send(result_1);
                //         } catch (error) {
                //             return ;
                //         }
                //     }
                // }) 
                        try {
                            res.send(result_1);
                        } catch (error) {
                            return ;
                        }
            }
            else 
            {
                console.log('update')// update 
        
                // var q = "update Group set "
                // q = q + " Groupname = '" + jsonData.USERName + "'"
                // q = q + " where GROupcode = ," + jsonData.GROupcode + ","
                // console.log(q)
                // request2.query(q, (err, recordset) => {
                //     if(err){
                //         console.log('query error :', err)
                //     }else{
                //         res.send(result_1);
                //         console.log('update 완료')
                //     }
                // })
            }

            //res.render('list.ejs',{'posts' : result_1})
        });
   });
///////////////////////////////////////////////////////////////
app.get('/idtiuser', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    // q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun,  \
    // USERGUBUN, user_groupno, date1, date2 from CM_TabUSER where USERName ='" + "홍길동5" + "'";
    q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun,  \
    USERGUBUN, user_groupno, date1, date2 from CM_TabUSER where USERName like '" + "홍길동%" + "'" ;    
    console.log('22222222',q); 
        request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
       
    });
    
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        console.log('Getresult123 :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});
app.get('/idtiusertest', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    // q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun,  \
    // USERGUBUN, user_groupno, date1, date2 from CM_TabUSER where USERName ='" + "홍길동5" + "'";
    q = "select USERID as rid, USERRF as rdesc, USERName as ipaddr, USERfLOOR as devicegroup, EndDate as controllername from CM_TabUSER" ;    
        request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
       
    });
    
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        // console.log('Getresult123 :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});
app.get('/idtiuser1', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    // q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun,  \
    // USERGUBUN, user_groupno, date1, date2 from CM_TabUSER where USERName ='" + "홍길동5" + "'";
    q = "select USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun,DelGubun,  \
    USERGUBUN, user_groupno, date1, date2 from CM_TabUSER " ;    
    // where USERName like '" + "홍길동%" + "'
        request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
       
    });
    
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        // console.log('Getresult123 :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});
///////////////////////////////
app.post('/qrcode', (req, res) => {
       
    const resultbody = req.body;
    const data1 = resultbody.data
    USERNAME = resultbody.USERNAME
    TELOFF = resultbody.TELOFF
    USERTEL= resultbody.USERTEL
    BIZOFF= resultbody.BIZOFF
    BIZTEL = resultbody.BIZTEL
    BIZNAME= resultbody.BIZNAME


    const Data_str = { 
        data1 : data1,
        USERNAME : USERNAME,
        TELOFF : TELOFF,
        USERTEL : USERTEL,
        BIZOFF : BIZOFF,
        BIZTEL : BIZTEL,
        BIZNAME : BIZNAME        
    }
    // const jsonData   = JSON.stringify(Data_str );

    console.log('qrcode' , data1)
    console.log('USERNAME' , USERNAME)
    console.log('TELOFF' , TELOFF)
    console.log('USERTEL' , USERTEL)
    console.log('BIZTEL' , BIZTEL)
    console.log('jsonData1' , Data_str)


    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let day = today.getDate();  // 날짜
    let nowdate = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
    let nowdate1 = year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+day.toString()).slice(-2));

    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var timeString = hours + minutes  + seconds;
    var timeString1 = nowdate1 + ' ' + hours + ':' + minutes  + ':' + seconds;

    var request = new sql.Request();
    request.stream = true;


    var q1 = "select  isnull(vdate,'') vdate,USERTEL from TabQrVisitor where vdate = '" + nowdate + "' and USERTEL =  '" + USERTEL + "'";
    console.log('q1',q1); 
    request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result[0].vdate;
            console.log(rdata);
        } catch (err) {
            rdata = 0;
        }

        var request1 = new sql.Request();
        if (rdata == 0)
        {
            var q = "insert into TabQrVisitor(vdate,vdate1,qrcode,USERNAME, TELOFF,USERTEL,BIZOFF,BIZTEL,BIZNAME,TGUBUN,TGUBUN1) "
            q = q + " values( '" + nowdate + "','" + timeString1 + "' ,'" + data1 + "',"
            q = q + " '" + USERNAME + "','" + TELOFF + "' ,'" + USERTEL + "','" + BIZOFF + "','" + BIZTEL + "','" + BIZNAME + "','" + '' + "','" + '' + "'"
            q = q + ")"
            request1.query(q, (err, recordset) => {
                if(err){
                    // consnole.log('query error :', err);
                    res.send("");
                }
                else{
                    try {
                        // console.log(q)
                        res.send(Data_str);
                    } catch (error) {
                        res.send("");
                        return ;
                    }
                }
            })
        }
        else 
        {   
            var q = "update TabQrVisitor set "
            q = q + " qrcode = '" + data1 + "'"
            q = q + " , USERNAME = '" + USERNAME + "'"
            q = q + " , BIZOFF = '" + BIZOFF + "'"
            q = q + " , BIZTEL = '" + BIZTEL + "'"
            q = q + " , BIZNAME = '" + BIZNAME + "'"
            q = q + " , TGUBUN = '" + TGUBUN + "'"
            q = q + " , TGUBUN1 = '" + TGUBUN1 + "'"                                
            q = q + " where vdate = '" + nowdate + "'"
            q = q + " and USERTEL = '" + USERTEL + "'"
            request1.query(q, (err, recordset) => {
                if(err){
                    consnole.log('query error :', err);
                    res.send("");
                }
                else{
                    try {
                        console.log(q)
                        res.send(Data_str);
                    } catch (error) {
                        res.send("");
                        return ;
                    }
                }
            })  
   
        }        

        // res.send(data1);
    });

})
///////////////////////////////
app.post('/qrlist', (req, res) => {
       
    const resultbody = req.body;
    const data1 = resultbody.data
    // USERNAME = resultbody.USERNAME
    // TELOFF = resultbody.TELOFF
    // USERTEL= resultbody.USERTEL
    // BIZTEL = resultbody.BIZTEL
    const Data_str = { 
        data1 : data1
        // USERNAME : USERNAME,
        // TELOFF : TELOFF,
        // USERTEL : USERTEL,
        // BIZTEL : BIZTEL
    }
    var request = new sql.Request();
    request.stream = true;
    console.log('qrlist',data1); 
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let day = today.getDate();  // 날짜
    let nowdate = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
    // const jsonData   = JSON.stringify(Data_str );
    var q1 = "select  * from TabQrVisitor where vdate = '" + nowdate + "' ";
    request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
           
            res.send(result);
        } catch (err) {
            rdata = 0;
        }
    })
})
//////////////////////////////
app.post('/idtiuserdelete', (req, res) => {
       
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var request2 = new sql.Request();
    request.stream = true;

    q1 = "select * from CM_TabUSER where USERID = '" + jsonData.USERID + "'";
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });

    var result_1 = [];

    request.on('error', function(USERID){
        console.log(err); 
    })
    .on('row', (row) => {
        result_1.push(row)
        
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].USERID;
            console.log(rdata);
        } catch (err) {
            rdata = 0;
        }

        if (rdata != 0)
        {
             console.log('delete')// update 

             var q = "delete from CM_TabUSER  "
             q = q + " where USERID = '" + jsonData.USERID + "'"
             console.log(q)
             request2.query(q, (err, recordset) => {
                 if(err){
                     console.log('query error :', err)
                 }else{
                    res.send(result_1);
                     console.log('delete 완료')
                 }
             })
        }

        //res.render('list.ejs',{'posts' : result_1})
    });

})
/////////////////////////////////

app.post('/groupinsert', (req, res) => {
    
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var request1 = new sql.Request();    
    var request2 = new sql.Request();    
    request.stream = true;

    q1 = "select * from Group where GROupcode = '" + jsonData.GROupcode + "'";
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });

    var result_1 = [];

    request.on('error', function(GROupcode){
        console.log(err); 
    })
    .on('row', (row) => {
        result_1.push(row)
        //Rdata = row.id;
        
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].GROupcode;
            console.log(rdata);
        } catch (err) {
            rdata = 0;
        }

        if (rdata == 0)
        {
            var q = "insert into Group(GROupcode, Groupname) \
            values( '" + jsonData.GROupcode + "','" + jsonData.Groupname + "')"
            console.log('insert',q)
            request1.query(q, (err, recordset) => {
                if(err){
                    consnole.log('query error :', err);
                }
                else{
                    try {
                        res.send(result_1);
                    } catch (error) {
                        return ;
                    }
                }
            }) 
            
        }
        else 
        {
             console.log('update')// update 
    
             var q = "update Group set "
             q = q + " Groupname = '" + jsonData.USERName + "'"
             q = q + " where GROupcode = ," + jsonData.GROupcode + ","
             console.log(q)
             request2.query(q, (err, recordset) => {
                 if(err){
                     console.log('query error :', err)
                 }else{
                    res.send(result_1);
                     console.log('update 완료')
                 }
             })
        }

        //res.render('list.ejs',{'posts' : result_1})
    });

})
///////////////////////////////////////////
app.post('/insert', (req, res) => {
    
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var request1 = new sql.Request();    
    var request2 = new sql.Request();    
    request.stream = true;

    q1 = "select * from CM_TabUSER where USERID = '" + jsonData.USERID + "'";
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });

    var result_1 = [];

    request.on('error', function(USERID){
        console.log(err); 
    })
    .on('row', (row) => {
        result_1.push(row)
        //Rdata = row.id;
        
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].USERID;
            console.log(rdata);
        } catch (err) {
            rdata = 0;
        }

        if (rdata == 0)
        {
            


            var q = "insert into CM_TabUSER(USERID, USERRF, USERName, USERfLOOR, EndDate, TranGubun, DelGubun, \
                    USERGUBUN, user_groupno, date1, date2) \
            values( '" + jsonData.USERID + "','" + jsonData.USERRF + "','" + jsonData.USERName + "' \
            ,'" + jsonData.USERfLOOR + "','" + jsonData.EndDate + "','" + jsonData.TranGubun + "' \
            ,'" + jsonData.DelGubun + "','" + jsonData.USERGUBUN + "','" + jsonData.user_groupno + "' \
            ,'" + jsonData.date1 + "','" + jsonData.date2 + "')"
            console.log('insert',q)
            request1.query(q, (err, recordset) => {
                if(err){
                    consnole.log('query error :', err);
                }
                else{
                    try {
                        res.send(result_1);
                    } catch (error) {
                        return ;
                    }
                }
            }) 
            
        }
        else 
        {
             console.log('update')// update 

             var q = "update CM_TabUSER set "
             q = q + " USERRF = '" + jsonData.USERRF + "'"
             q = q + " ,USERName = '" + jsonData.USERName + "'"
             q = q + " ,USERfLOOR = '" + jsonData.USERfLOOR + "'"
             q = q + " ,EndDate = '" + jsonData.EndDate + "'"
             q = q + " ,TranGubun = '" + jsonData.TranGubun + "'"
             q = q + " ,DelGubun = '" + jsonData.DelGubun + "'"
             q = q + " ,USERGUBUN = '" + jsonData.USERGUBUN + "'"
             q = q + " ,user_groupno = " + jsonData.user_groupno + ""
             q = q + " ,date1 = '" + jsonData.date1 + "'"
             q = q + " ,date2 = '" + jsonData.date2 + "'"
             q = q + " where USERID = ," + jsonData.USERID + ","
             console.log(q)
             request2.query(q, (err, recordset) => {
                 if(err){
                     console.log('query error :', err)
                 }else{
                    res.send(result_1);
                     console.log('update 완료')
                 }
             })
        }

        //res.render('list.ejs',{'posts' : result_1})
    });

})
////////////////////////////////////
app.post('/fileUpload', (req, res) => {
    
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var result_1 = [];
    request.stream = true;
    console.log('jsonData',jsonData)
    console.log('result',result)
    res.send(jsonData)
})
// app.post('/ImgFileUpload', async function (req, res) {
app.post('/ImgFileUpload',  (req, res) => {
    const form = formidable({
        multiples:false,
        uploadDir:'./img'
    })    
    form.parse(req,(err,field,file) => {
        if(err) {
            console.log('Get Erroe',err)
        } else {
            console.log('ok')
            const fileData = file.file;
            console.log('fileData', fileData.originalFilename);
        }
        console.log('send')
        res.send('aaaa')
    })
   
})
//////////////////////////////////////////
app.post('/groupinsert', (req, res) => {
    
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var request1 = new sql.Request();    
    var request2 = new sql.Request();    
    request.stream = true;
    console.log('jsonData',jsonData)
    console.log('jsonData.TXTID',jsonData.TXTID)
    if (jsonData.TXTID == '신규')
    {
        try {    
            q1 = "select (CASE WHEN MAX(GROUP_ID) IS NULL THEN '10000001' ELSE CONVERT(VARCHAR,MAX(GROUP_ID) +1 ) as CNT1 "
            q1 = q1 + " from tabGroup"  
            console.log(q1); 
            request.query(q1, (err, recordset) => {
                if(err){
                    res.send('err');
                    return console.log('query error :',err)
                }
            });
        } catch (err) {
            rdata = 0;
            res.send('err');
            console.log('err')
        }
        var result_1 = [];
        request.on('error', function(id){
            console.log('err'); 
            
        })
        .on('row', (row) => {
            result_1.push(row)
        })
        .on('done', () => { // 마지막에 실행되는 부분
    /////////////////////
        rdata = result_1[0].USERID;
        var SQL = " INSERT INTO TabGroup"
            SQL = SQL & " (    	Group_Id 	,Group_Name	,Group_Saup 	,Group_Ceo 	,Group_Tel "
            SQL = SQL & " ,Group_Uptae	,Group_JongMok	,Group_Damdang	,Group_DTel 	,Group_Email"
            SQL = SQL & " ,Group_Zip 	,Group_add	,Group_add1"
            SQL = SQL & " ,Group_WZip	,Group_Wadd	,Group_Wadd1"
            SQL = SQL & " ,Group_WDamdang	,Group_WTel	,Group_Rdate	,Group_Ldate	,Group_Use )"
            SQL = SQL & " Values ("
            SQL = SQL + " Values ("
            SQL = SQL + "  '" + rdata + "','" + jsonData.TXTNAME + "','" + jsonData.TXTSAUP + "','" + jsonData.TXTCEO + "','" + jsonData.TXTTEL + "'"
            SQL = SQL + "  ,'" + jsonData.TXTUPTAE + "','" + jsonData.TXTJONGMOK + "','" + jsonData.TXTDAMDANG + "','" + jsonData.TXTDTEL + "','" + jsonData.TXTEMAIL + "'"
            SQL = SQL + "  ,'" + jsonData.TXTZIP + "','" + jsonData.TXTADD + "','" + jsonData.TXTADD1 + "' "
            SQL = SQL + "  ,'" + jsonData.TXTWZIP + "','" + jsonData.TXTWADD + "','" + jsonData.TXTWADD1 + "' "
            SQL = SQL + "  ,'" + jsonData.TXTWDAMDANG + "','" + jsonData.TXTWTEL + "','" + jsonData.DTP1 + "','" + "99981231" + "','" + jsonData.COBUSE + "')"
            console.log('insert',SQL)
            request1.query(SQL, (err, recordset) => {
                if(err){
                    consnole.log('query error :', err);
                }
                else{
                    try {
                        res.send(result_1);
                    } catch (error) {
                        return ;
                    }
                }
            }) 
    /////////////////////
        });  
        
        for (let i = 0; i < 6; i++)
        {
            if (i == 0 )
            {

                // var   SQL = " SELECT  *  "
                // SQL = SQL & " From TabGroupMenu "
                // SQL = SQL & " WHERE          Group_id  = '" & TxtID.Text & "'"
                // SQL = SQL & " and            GUBUN  = " & index1 & ""
                // console.log('insert',SQL)
                // request1.query(SQL, (err, recordset) => {
                //     if(err){
                //         consnole.log('query error :', err);
                //     }
                //     else{
                //         try {
                //             res.send(result_1);
                //         } catch (error) {
                //             return ;
                //         }
                //     }
                // }) 
                if (jsonData.DTFDATE1 == TRUE )
                {
                    var   SQL = " INSERT INTO TabGroupMenu"
                    SQL = SQL & " (    Group_id , GUBUN, Ftime, Ltime,  su, pay ,Offpay,pay_Gubun)"
                    SQL = SQL & " Values ("
                    SQL = SQL & "  '" & rdata & "'"
                    SQL = SQL & " ,'" & 0 & "'"
                    SQL = SQL & " ,'" & jsonData.DTFDATE1 & "'"
                    SQL = SQL & " ,'" & jsonData.DTLDATE1 & "'"
                    SQL = SQL & " ," & jsonData.TXTSU1 & ""
                    SQL = SQL & " ," & jsonData.TXTMONEY1 & ""
                    SQL = SQL & " ," & 0 & ""
                    SQL = SQL & " ,'" & jsonData.CHK1 & "')"
                    request1.query(SQL, (err, recordset) => {
                        if(err){
                            consnole.log('query error :', err);
                        }
                        else{
                            try {
                                res.send(result_1);
                            } catch (error) {
                                return ;
                            }
                        }
                    }) 
                }
                

            }
            if (i == 1 )
            {
                if (jsonData.DTFDATE2 == TRUE )
                {
                    var   SQL = " INSERT INTO TabGroupMenu"
                    SQL = SQL & " (    Group_id , GUBUN, Ftime, Ltime,  su, pay ,Offpay,pay_Gubun)"
                    SQL = SQL & " Values ("
                    SQL = SQL & "  '" & rdata & "'"
                    SQL = SQL & " ,'" & 1 & "'"
                    SQL = SQL & " ,'" & jsonData.DTFDATE2 & "'"
                    SQL = SQL & " ,'" & jsonData.DTLDATE2 & "'"
                    SQL = SQL & " ," & jsonData.TXTSU2 & ""
                    SQL = SQL & " ," & jsonData.TXTMONEY2 & ""
                    SQL = SQL & " ," & 0 & ""
                    SQL = SQL & " ,'" & jsonData.CHK2 & "')"
                    request1.query(SQL, (err, recordset) => {
                        if(err){
                            consnole.log('query error :', err);
                        }
                        else{
                            try {
                                res.send(result_1);
                            } catch (error) {
                                return ;
                            }
                        }
                    }) 
                }
            }
            if (i == 2 )
            {
                if (jsonData.DTFDATE3 == TRUE )
                {
                    var   SQL = " INSERT INTO TabGroupMenu"
                    SQL = SQL & " (    Group_id , GUBUN, Ftime, Ltime,  su, pay ,Offpay,pay_Gubun)"
                    SQL = SQL & " Values ("
                    SQL = SQL & "  '" & rdata & "'"
                    SQL = SQL & " ,'" & 2 & "'"
                    SQL = SQL & " ,'" & jsonData.DTFDATE3 & "'"
                    SQL = SQL & " ,'" & jsonData.DTLDATE3 & "'"
                    SQL = SQL & " ," & jsonData.TXTSU3 & ""
                    SQL = SQL & " ," & jsonData.TXTMONEY3 & ""
                    SQL = SQL & " ," & 0 & ""
                    SQL = SQL & " ,'" & jsonData.CHK3 & "')"
                    request1.query(SQL, (err, recordset) => {
                        if(err){
                            consnole.log('query error :', err);
                        }
                        else{
                            try {
                                res.send(result_1);
                            } catch (error) {
                                return ;
                            }
                        }
                    }) 
                }
            }
            if (i == 3 )
            {
                if (jsonData.DTFDATE4 == TRUE )
                {
                    var   SQL = " INSERT INTO TabGroupMenu"
                    SQL = SQL & " (    Group_id , GUBUN, Ftime, Ltime,  su, pay ,Offpay,pay_Gubun)"
                    SQL = SQL & " Values ("
                    SQL = SQL & "  '" & rdata & "'"
                    SQL = SQL & " ,'" & 3 & "'"
                    SQL = SQL & " ,'" & jsonData.DTFDATE4 & "'"
                    SQL = SQL & " ,'" & jsonData.DTLDATE4 & "'"
                    SQL = SQL & " ," & jsonData.TXTSU4 & ""
                    SQL = SQL & " ," & jsonData.TXTMONEY4 & ""
                    SQL = SQL & " ," & 0 & ""
                    SQL = SQL & " ,'" & jsonData.CHK4 & "')"
                    request1.query(SQL, (err, recordset) => {
                        if(err){
                            consnole.log('query error :', err);
                        }
                        else{
                            try {
                                res.send(result_1);
                            } catch (error) {
                                return ;
                            }
                        }
                    }) 
                }
            }
            if (i == 4 )
            {
                if (jsonData.DTFDATE4 == TRUE )
                {
                    var   SQL = " INSERT INTO TabGroupMenu"
                    SQL = SQL & " (    Group_id , GUBUN, Ftime, Ltime,  su, pay ,Offpay,pay_Gubun)"
                    SQL = SQL & " Values ("
                    SQL = SQL & "  '" & rdata & "'"
                    SQL = SQL & " ,'" & 4 & "'"
                    SQL = SQL & " ,'" & jsonData.DTFDATE4 & "'"
                    SQL = SQL & " ,'" & jsonData.DTLDATE4 & "'"
                    SQL = SQL & " ," & jsonData.TXTSU4 & ""
                    SQL = SQL & " ," & jsonData.TXTMONEY4 & ""
                    SQL = SQL & " ," & 0 & ""
                    SQL = SQL & " ,'" & jsonData.CHK4 & "')"
                    request1.query(SQL, (err, recordset) => {
                        if(err){
                            consnole.log('query error :', err);
                        }
                        else{
                            try {
                                res.send(result_1);
                            } catch (error) {
                                return ;
                            }
                        }
                    }) 
                }
            }
            if (i == 5 )
            {
                if (jsonData.DTFDATE4 == TRUE )
                {
                    var   SQL = " INSERT INTO TabGroupMenu"
                    SQL = SQL & " (    Group_id , GUBUN, Ftime, Ltime,  su, pay ,Offpay,pay_Gubun)"
                    SQL = SQL & " Values ("
                    SQL = SQL & "  '" & rdata & "'"
                    SQL = SQL & " ,'" & 5 & "'"
                    SQL = SQL & " ,'" & jsonData.DTFDATE4 & "'"
                    SQL = SQL & " ,'" & jsonData.DTLDATE4 & "'"
                    SQL = SQL & " ," & jsonData.TXTSU4 & ""
                    SQL = SQL & " ," & jsonData.TXTMONEY4 & ""
                    SQL = SQL & " ," & 0 & ""
                    SQL = SQL & " ,'" & jsonData.CHK4 & "')"
                    request1.query(SQL, (err, recordset) => {
                        if(err){
                            consnole.log('query error :', err);
                        }
                        else{
                            try {
                                res.send(result_1);
                            } catch (error) {
                                return ;
                            }
                        }
                    }) 
                }
            }                                                          
        }


    }

})

///////////////////////////////////////////////////
app.post('/usersabun', (req, res) => {
    const user_id = req.query.id
    // user_id = req.query.id;
    var rdata = '';

    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    console.log('user_id',user_id); 

    try {
        q1 = "select LOGID as id from CM_SAWON1 where SIDX = '" + user_id + "'";
        console.log(q1); 
        request.query(q1, (err, recordset) => {
            if(err){
                 res.send('err');
                return console.log('query error :',err)
            }
        });
    } catch (err) {
        rdata = 0;
        res.send('err');
        console.log('err')
    }
    var result_1 = [];
    request.on('error', function(id){
        res.send('err');
        // console.log(err); 
        
    })
    .on('row', (row) => {
        result_1.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].id;
            console.log('rdata',result_1);
            res.send(result_1);
        } catch (err) {
            rdata = 0;
            res.send('err');
            console.log('err')
        }

       

        //res.render('list.ejs',{'posts' : result_1})
    });

})

app.post('/Login', (req, res) => {
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
    // const result = req.body;
    // var rdata = [{sabun : }];
    // const jsonData = JSON.parse(JSON.stringify(result));

    console.log("user_id ",user_id )
    console.log("user_pw ",user_pw )

    var request = new sql.Request();
    request.stream = true;


    q1 = "select LOGID as sabun from SAWON where LOGID = '" + user_id + "' and  pwd = '" + user_pw + "'";
    // console.log('q1',q1)
    request.query(q1, (err, recordset) => {
        if(err){
            console.log('1',q1)
            return console.log('query error :',err)
        }
       
    });
    var result = [];
    request.on('error', function(err){
        console.log('2',q1)
        console.log(err); 
    })
    .on('row', (row) => {
        console.log('3',q1)
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        
        //  if(result === true){
            // result  = [{ sabun: ""}]
            
            // if(!![].findindex(result) )
            let result2 = JSON.stringify(result)
            console.log('ㅁㅁㅁ',result2);
           
            let result3 = result2.indexOf('[]');
            console.log('ㅁㅁㅁ1',result3);

            if(result3 === -1) 
            {
                console.log('sabun789 :', result)
                res.send(result);
            }
            else
            {
                console.log('sabun789123 :', result)
                const result1  = [{ sabun: "err"}]
                res.send(result1);
            }
            
        // }
        // else
        // {
        //     console.log('sabun456 :', result)
        //     res.send(result);
    
        // }
    });
    //res.send('aaaaaa');

});
    

app.post('/eventlog1', (req, res) => {
    const user_fdate = req.query.Fdate
    const user_ldate = req.query.Ldate
    var rdata = '';
    const user_id= '';
    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    q1 = "  select bb.rdesc,bb.controllername bb ,aa.eventdate, aa.eventtime,aa.eventcode "
    q1 = q1 + " from [dbo].[controller_tbl] bb  inner join [dbo].[eventlog_tbl] aa on aa.controllerid = bb.rid "
    if (user_id === "")
    {
        q1 = q1 + " where 1 = 1";    
    }
    else
    {
        q1 = q1 + " where eventdate = '" + user_fdate + "' and  '" + user_ldate + "' ";    
    }
    q1 = q1 + " order by eventdatetime desc "
   // console.log ('lee',q1);
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });

    var result_1 = [];
    request.on('error', function(id){
        console.log(err); 
    })
    .on('row', (row) => {
        result_1.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].id;
            // console.log('rdata',result_1);
            res.send(result_1);
        } catch (err) {
            rdata = 0;
            res.send('err');
            console.log('err')
        }

       

        //res.render('list.ejs',{'posts' : result_1})
    });

})

app.get('/eventlog', (req, res) => {
    // const user_fdate = req.query.Fdate
    // const user_ldate = req.query.Ldate
    var rdata = '';

    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    q1 = " select bb.rdesc,bb.controllername ,aa.eventdate, aa.eventtime,aa.eventcode  from [dbo].[controller_tbl] bb inner join [dbo].[eventlog_tbl] aa   on aa.controllerid = bb.rid "
    // if (user_id === "")
    // {
    //     q1 = q1 + " where 1 = 1 ";    
    // }
    // else
    // {
    //     q1 = q1 + " where eventdate = '" + user_fdate + "' and  '" + user_ldate + "' ";    
    // }
    q1 = q1 + " order by eventdatetime desc "
    console.log ('lee',q1);
     request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });

    var result_1 = [];
    request.on('error', function(id){
        console.log("eventlogerr"); 
    })
    .on('row', (row) => {
        result_1.push(row)
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].id;
            // console.log('rdata',result_1);
            res.send(result_1);
        } catch (err) {
            rdata = 0;
            res.send('err');
            console.log('err')
        }

       

        //res.render('list.ejs',{'posts' : result_1})
    });

})
