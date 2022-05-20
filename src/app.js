const WebSocket = require('ws');
const Tools  = require('./utils/tools');
const { SERVER_PORT , WS_PORT}  = require('./config/config.default');
const app = require('./app/index');

const wss = new WebSocket.Server({ port: WS_PORT });
const tools = new Tools();


let users = {};
let online = 0;


//广播
wss.broadcast = function broadcast(ws) {

	// debugger;
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
          client.send(ws);	
      }
    });
};



//socket初始化
wss.on('connection', (ws, req) =>{

  online = wss._server._connections;
  console.log('当前在线' + online+'个连接');

    let i = req.url;
    users[i] = ws
    console.log(i)




  ws.on('open', function open() {
    console.log("online")
    
  });


  // setInterval(function(){
  //     ws.send("{'222':'22'}");
  //   },1000)

  ws.on('message', async (jsonStr,flags) => {
    let obj = eval('(' + jsonStr + ')')

    if(obj['type'] != 2){
      let key = i.split("?")[1],
          toPath = obj['to']+"?"+key;
      if(users.hasOwnProperty(toPath)){
        console.log("from: "+i);
        
        console.log(obj)
        users[toPath].send(JSON.stringify(obj));
        return true
      }
      // console.log(obj)
      // console.log(obj['to']+' 未上线,发送失败')
    }else{
      console.log("-----接收心跳-----")
    }

    // switch(obj['type']){
    //   case 2: 
    //     console.log("-----接收心跳-----")
    //     break
    //   case 0:{
    //     let key = i.split("?")[1],
    //         toPath = obj['to']+"?"+key;
    //     if(users.hasOwnProperty(toPath)){
    //       console.log("from: "+i);
          
    //       console.log(obj)
    //       users[toPath].send(JSON.stringify(obj));
    //        return true
    //     }
    //     // console.log(obj)
    //     console.log(obj['to']+' 未上线,发送失败')
    //     break
    //   }
    //   case 1:{
    //     let key = i.split("?")[1],
    //         toPath = obj['to']+"?"+key;

    //     if(users.hasOwnProperty(toPath)){
    //       console.log("from: "+i)
    //       console.log(obj)
    //       users[toPath].send(JSON.stringify(obj));
    //        return true
    //     }
    //     console.log(obj)
    //     console.log(obj['to']+' 未上线,发送失败')
    //     break
    //   }
    //   default:
        
      
    // }

  

    // if(obj['type'] === 'normal' && users.hasOwnProperty(obj['to'])){
    //   console.log("from: "+i)

    //   console.log(obj)
    //   users[obj['to']].send(JSON.stringify(obj));
    // }else{
    //   console.log(obj['to']+' 未上线,发送失败')
    // }
    
    // wss.broadcast("pico get"); 
  });



  ws.on("error", async(Error) =>{
    console.log(Error)
  })
 
});



app.listen(SERVER_PORT, () => {
  console.log("server started on http://localhost:8081");
})


