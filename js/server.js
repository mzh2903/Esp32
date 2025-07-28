const express=require('express')
const ws=require('express-ws')
const path=require('path')
const app=express()
ws(app)
const clients = [];

app.ws('/ws', (ws, req) => {
    clients.push(ws);
    console.log('connect')
     ws.on('message', (msg) => {
    const data=JSON.parse(msg);
    if(data.e=='s'){
            clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({e:'r',msg:data.msg}));
      }})
    }
    })
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','HTML', 'index.html'));
});

app.listen('4000','0.0.0.0')