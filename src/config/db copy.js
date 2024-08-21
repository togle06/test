//import dotenv from "dotenv";

const sql = require('mssql');
//dotenv.config();
require('dotenv').config();

const config = {
    server:  process.env.DB_HOST,
    port: 1433,
    options: { encrypt:false, database: process.env.DB_DATABASE },
    authentication:{
        type:"default",
        options:{
            userName:process.env.DB_USER,
            password:process.env.DB_PASSWORD
        }
    }
};


const config1 = {
  server:  process.env.DB_HOST,
  port: 1433,
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
//module.exports = db;
module.exports = {
  sql, config
}

