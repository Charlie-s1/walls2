const mysql = require('mysql2/promise');
const config = require('./config');
const globalConnection = mysql.createConnection(config.mysql);
const { parse } = require('querystring');
const fs = require('fs');


async function signUp(userName,password,res){
  console.log(userName,password);
  const sql = await init();
  const insertQuery = sql.format('INSERT INTO user SET ? ;', { userName,password });
  await sql.query(insertQuery);
}

async function signIn(res,name,pass){
  console.log(name,pass);
  const sql = await init();
  try{
    const insertQuery = sql.format(`SELECT 1 FROM user where userName = '${name}' and password = '${pass}' limit 1;`);//, {name});
    const check = await sql.query(insertQuery);

    console.log(check.userName);
    console.log(check[0],check[0].password);
    if (check[0] != ""){
      console.log("user exixts");
      return res.redirect('walls');
    }else{
      console.log("USER DOESN'T EXIST");
      return res.redirect('/..');
    }
    return "done";
  }
  catch(e){
    console.log(e);
  }
}

async function messageUp(title,message,posterName){
  const sql = await init();
  const points = 0;
  const insertQuery = sql.format('INSERT INTO message SET ? ;', { title,message,points,posterName });
  await sql.query(insertQuery);
}

async function getMessages(res) {
  const myConn = await init();
  const [rows] = await myConn.execute('SELECT * FROM message ORDER BY id DESC LIMIT 50');

  var messages = JSON.stringify(rows);
  return messages;
}
async function upVote(id){
  try{
    const sql = await newConnection();
    let query = sql.format(`SELECT points FROM message where id = ${id}`);
    const [row] = await sql.query(query);
    const string = JSON.stringify(row);
    const json = JSON.parse(string);
    let points = parseInt(++json[0].points);

    query = sql.format(`update message set points = ${points} where id = ${id}`);
    await sql.query(query);
  }
  catch(e){
    console.log(e);
  }
}
async function dnVote(id){
  try{
    const sql = await newConnection();
    let query = sql.format(`SELECT points FROM message where id = ${id}`);
    const [row] = await sql.query(query);
    const string = JSON.stringify(row);
    const json = JSON.parse(string);
    let points = parseInt(--json[0].points);

    query = sql.format(`update message set points = ${points} where id = ${id}`);
    await sql.query(query);
  }
  catch(e){
    console.log(e);
  }
}
module.exports = {
  signUp : signUp,
  signIn : signIn,
  messageUp : messageUp,
  getMessages : getMessages,
  upVote : upVote,
  dnVote : dnVote
};

/*
connection to db
*/
let sqlPromise = null;

async function init() {
  if (sqlPromise){
    return sqlPromise;
  }

  sqlPromise = newConnection();
  return sqlPromise;
}
async function newConnection() {
  // todo: this should really use connection pools
  const sql = await mysql.createConnection(config.mysql);

  // handle unexpected errors by just logging them
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });

  return sql;
}
async function releaseConnection(connection) {
  await connection.end();
}
