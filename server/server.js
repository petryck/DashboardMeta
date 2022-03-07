import geckos from '@geckos.io/server'
import mysql from 'mysql'
import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'
import http from 'http'

const server = http.Server(app);
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Console } from 'console'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const port = 3560

const io = geckos()
app.use(cors())
app.use('/', express.static(path.join(__dirname, '../client')))

var connection = mysql.createConnection({
  host: "ads-con.csvfil6euj3s.sa-east-1.rds.amazonaws.com",
  user: "ads",
  port: "3286",
  password: "99659819aA",
  database: "db",
  charset: "utf8mb4"
});


connection.connect(function(err) {

  if(err){
    console.log('ERRO AO ACESSAR DB --> MYSQL')
    setTimeout(incia_conexao, 2000);
  }else{
      console.log('CONECTADO DB --> MYSQL')
  }

}); 

// connection.incia_conexao();


server.lastPlayderID = 0;
var players = [];

io.addServer(server)

io.onConnection(channel => {
    
  channel.on('ready', data => {

    channel.player = {
      id: data.id,
      nome: data.nome,
      token:data.token
  }; 



  
  })

    

    channel.on('SendMessege', data => {

      var saida_player = {
        id: channel.player.id,
        msg: data,
        name: channel.player.name
    };
    console.log(saida_player)

    channel.broadcast.emit('SendMessege',saida_player);
    })


    

    channel.onDisconnect(() => {
      // console.log(channel)
   
      console.log(channel.player.id+' removido')

   
      io.emit('remove',channel.player.id);
    

     players = players.filter((item) => item.id !== channel.player.id);
  
      
    })

      channel.emit('ready') 

})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })


server.listen(port, function () {
    console.log(`Servidor Carregado http://localhost:${server.address().port}`);
});