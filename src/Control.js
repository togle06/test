
// const express = require('express');
// // const app = express();
// const bodyparser = require("body-parser");
// const dotenv = require("dotenv");
// const { sql,  Config } = require('./src/config/db');
// const axios = require('axios');
// const cors = require('cors');
// const io = require("socket.io-client");
// const { sql,  Config } = require('./src/config/db');

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

// app.use(bodyparser.urlencoded({extended: false}));
// app.use(bodyparser.json());
// app.use(express.static(__dirname +'/'));
//app.use(express.json());






    
    
/////////////////////////////////////////////////


/////////////////////////////////////////////////

// app.get('/Group', (req, res) => {
//     var request = new sql.Request();
//     request.stream = true;
//     // value: '그룹', label
//     q = 'select GROupcode as value ,Groupname as label  from [dbo].[Group]';
//     request.query(q, (err, recordset) => {
//         if(err){
//             return console.log('query error :',err)
//         }
//         // console.log(recordset);
//         return;
//     });
   
//     var result = [];
//     request.on('error', function(err){
//         console.log(err); 
//     })
//     .on('row', (row) => {
//         result.push(row)
//     })
//     .on
//     ('done', () => { // 마지막에 실행되는 부분
//          console.log('group :', result)
//         // res.render('list.ejs',{'posts' : result})
//         res.send(result);
//     });
//     //res.send('aaaaaa');
// });


