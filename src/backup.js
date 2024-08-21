
const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const { sql,  Config } = require('./src/config/db');
const axios = require('axios');
const cors = require('cors');
const io = require("socket.io-client");
const Control = require('./src/Control');
let data1 = [{ id: '123456789' }]
// 
// function server() {
//     <div classname = "main-bg">
//         <div>
//             {/* <BasicExample/>   */}
//             {/* <Input /> */}
//             안녕하세요
//         </div>  
//     </div>  
// }
{/* <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script> */}
// const ffi = require("ffi-napi");
// const dll = ffi.Library("./CMINC.InOutControl", {
//     InsertID: ["int", ["string", "string", "string", "string", "string"]],
//   });

const port =  3005 //process.env.PORT || 3005 ;
// ${process.env.PORT}
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});



app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(__dirname +'/'));
//app.use(express.json());

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))

//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true }));

const onAddDetailDiv = (function() {
        axios.get('http://localhost:3005/controller1')
        .then(response => {
                 console.log("response",response)
                // setUser(response);
                //empList.push(response)
                // setTableData(response)
                // empList = response
        .catch(()=>{
            console.log('controller실패ㅜㅜ')
        }); //요청이 실패했을 때    
        });
    })



    
    
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
app.post('/controller1', (req, res) => {
    const user_id = req.query.id
    var rdata = '';
    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    q1 = "select * from controller_tbl where sabun = '" + user_id + "'";
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
         console.log('group :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});
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

app.get('/user', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    q = 'select * from user1';
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
       // console.log('Getresult :', result)
        // res.render('list.ejs',{'posts' : result})
        res.send(result);
    });
    //res.send('aaaaaa');
});

app.post('/usersabun', (req, res) => {
    const user_id = req.query.id
    var rdata = '';
    //   console.log('result.id ',user_id);
    var request = new sql.Request();
    request.stream = true;
    q1 = "select id from user1 where sabun = '" + user_id + "'";
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

app.post('/delete', (req, res) => {
       
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var request2 = new sql.Request();
    request.stream = true;

    q1 = "select * from user1 where id = " + jsonData.id + "";
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
            console.log(rdata);
        } catch (err) {
            rdata = 0;
        }

        if (rdata != 0)
        {
             console.log('delete')// update 

             var q = "delete from user1  "
             q = q + " where id = " + jsonData.id + ""
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


app.post('/insert', (req, res) => {
    
    const result = req.body;
    var rdata = 0;
    const jsonData = JSON.parse(JSON.stringify(result));
    var request = new sql.Request();
    var request1 = new sql.Request();    
    var request2 = new sql.Request();    
    request.stream = true;

    q1 = "select * from user1 where id = " + jsonData.id + "";
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
        //Rdata = row.id;
        
    })
    .on('done', () => { // 마지막에 실행되는 부분
        try {
            rdata = result_1[0].id;
            console.log(rdata);
        } catch (err) {
            rdata = 0;
        }

        if (rdata == 0)
        {
            var q = "insert into user1(id, name, sabun, Dep, Position, Cgroup) \
            values( " + jsonData.id + ",'" + jsonData.name + "','" + jsonData.sabun + "' \
            ,'" + jsonData.Dep + "','" + jsonData.Position + "','" + jsonData.Cgroup + "')"
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

             var q = "update user1 set "
             q = q + " name = '" + jsonData.name + "'"
             q = q + " ,sabun = '" + jsonData.sabun + "'"
             q = q + " ,Dep = '" + jsonData.Dep + "'"
             q = q + " ,Position = '" + jsonData.Position + "'"
             q = q + " ,Cgroup = '" + jsonData.Cgroup + "'"
             q = q + " where id = " + jsonData.id + ""
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

app.post('/Login', (req, res) => {
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
    // const result = req.body;
    var rdata = '';
    // const jsonData = JSON.parse(JSON.stringify(result));

    console.log("user_id ",user_id )
    console.log("user_pw ",user_pw )
    var request = new sql.Request();
    request.stream = true;

    q1 = "select sabun from user1 where sabun = '" + user_id + "' and  pwd = '" + user_pw + "'";
    request.query(q1, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
       
    });
    var result =[];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        console.log('123',q1)
        console.log('sabun :', result)
        res.send(result);
    });
    //res.send('aaaaaa');

});
    

