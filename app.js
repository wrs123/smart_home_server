const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8091 });

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

function binaryToStr(str){
  var result = [];
  var list = str.split(" ");
  for(var i=0;i<list.length;i++){
       var item = list[i];
       var asciiCode = parseInt(item,2);
       var charValue = String.fromCharCode(asciiCode);
       result.push(charValue);
  }
  return result.join("");
}

//socket初始化
wss.on('connection', (ws, req) =>{

  online =wss._server._connections;
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

    switch(obj['type']){
      case 'heartbeat': 
        console.log("-----接收心跳-----")
        break
      case 'normal':
        if(users.hasOwnProperty(obj['to'])){
          console.log("from: "+i)
          console.log(obj)
          users[obj['to']].send(JSON.stringify(obj));
           return true
        }
        console.log(obj)
        console.log(obj['to']+' 未上线,发送失败')
        break
      case 'ctr':
        if(users.hasOwnProperty(obj['to'])){
          console.log("from: "+i)
          console.log(obj)
          users[obj['to']].send(JSON.stringify(obj));
           return true
        }
        console.log(obj)
        console.log(obj['to']+' 未上线,发送失败')
        break
      default:
        
      
    }

  

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


