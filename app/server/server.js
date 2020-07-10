const express = require('express');
const app = express();
const db = require('./db');
const { parse } = require('querystring');
const fs = require('fs');

//signUp
app.post('/signUp',function (req,res){
  //console.log(req.body.user.name);
  console.log(req.method);
  if (req.method == 'POST'){
    let body = '';
//getting data from html
    req.on('data', chunk => {
        body += chunk.toString();
    });
//using post data to upload to db
    req.on('end', () => {
      let pbody = parse(body);
      db.signUp(pbody.name,pbody.pass,res);
      //add check
      return res.redirect('/getMessages');
    });
  }else{
    console.log("NOT");
  }
})
//signIn
app.post('/signIn',function (req,res){
  if (req.method == 'POST'){
    let body = '';
//getting data from html
    req.on('data', chunk => {
        body += chunk.toString();
    });
//using post data to upload to db
    req.on('end', () => {
      let pbody = parse(body);
      db.signIn(res,pbody.name,pbody.pass);

    });
  }
})
//upload message
app.post('/messageUp',function(req,res){
  if (req.method == 'POST'){
    let body = '';
//getting data from html
    req.on('data', chunk => {
        body += chunk.toString();
    });
//using post data to upload to db
    req.on('end', () => {
      let pbody = parse(body);
      console.log(pbody.title,pbody.content,pbody.author);
      db.messageUp(pbody.title,pbody.content,pbody.author);
      return res.redirect('/getMessages');
    });
  }
})

app.get("/getMessages",async function(req,res){
  try {
    //res.json(db.getMessages(res));
    //console.log(db.getMessages());
    //console.log(messages);
    const msg = await db.getMessages(res);
    fs.writeFile('app/webPages/walls/messages.json', msg, 'utf8',function(err){
      if (err){
        console.log("nope");
      }else{
        console.log("got messages");
      }
    });

    return res.redirect('/walls');

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})
app.get("/up",function(req,res){
  //console.log(req.query.id);
  const id = parseInt(req.query.id);
  db.upVote(id);
  return res.redirect('/getMessages');
})
app.get("/dn",function(req,res){
  //console.log(req.query.id);
  const id = parseInt(req.query.id);
  db.dnVote(id);
  return res.redirect('/getMessages');
})
//use webPages
app.use(express.static('app/webPages'));
//server start
app.listen(8080);
