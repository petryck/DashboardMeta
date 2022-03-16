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




// const sql = require('mssql');
import sql from 'mssql'
const connStr2 = "Server=CONLINE.SQL.HEADCARGO.COM.BR,9322;Database=headcargo_conline;User Id=hc_conline_consulta;Password=3C23D35C-84F4-4205-80A2-D59D58A81BEF;";


const connStr = {
  user: 'hc_conline_consulta',
  password: '3C23D35C-84F4-4205-80A2-D59D58A81BEF',
  database: 'headcargo_conline',
  port:9322,
  server: 'CONLINE.SQL.HEADCARGO.COM.BR',
  pool: {
    max: 99999,
    min: 0,
    idleTimeoutMillis: 90000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

//fazendo a conexão global
// sql.connect(connStr)
//    .then(conn => global.conn = conn)
//    .catch(err => console.log(err));


  //  sql.connect(connStr)
  //  .then(conn => console.log("conectou!"))
  //  .catch(err => console.log("erro! " + err));

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => {
    global.conn = conn
    novoProcesso()
   })
   .catch(err => console.log(err));


import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const io = geckos()
app.use(cors())

app.use('/', express.static(path.join(__dirname, '../public')))

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
var ultimoid_processo = 0;

io.addServer(server)

io.onConnection(channel => {

  console.log('conectou geral')
    
  channel.on('ready', data => {
    console.log('conectou')

    channel.player = {
      id: data.id,
      nome: data.nome,
      token:data.token
  }; 


  channel.broadcast.emit('novoProcesso','dsadsa');
  
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


  


function novoProcesso(){

  global.conn.request()
  .query(`SELECT TOP 1
  FORMAT(Lhs.Data_Abertura_Processo , 'dd/MM/yyyy HH:mm') as data_Abertura_Convertido,
  Lhs.Numero_Processo,
  Lhs.Data_Abertura_Processo,
  Lhs.IdLogistica_House as IdProcesso,
  Vnd.Nome as Vendedor,
  Vnd.Foto as Foto_Vendedor,
  Ins.Nome as InsideSales,
  Ins.Foto as Foto_InsideSales,
  Lms.Modalidade_Processo /*Aereo / MAritimo / Terrestre*/
From
  mov_Logistica_House Lhs
JOIN
  mov_Logistica_Master Lms on Lms.IdLogistica_Master = Lhs.IdLogistica_Master
Left Outer JOIN
  vis_Funcionario Vnd on Vnd.IdPessoa = Lhs.IdVendedor
Left Outer JOIN
  mov_Projeto_Atividade_Responsavel Par on Par.IdProjeto_Atividade = Lhs.IdProjeto_Atividade and (Par.IdPapel_Projeto = 12)
Left Outer JOIN
  vis_Funcionario Ins on Ins.IdPessoa = Par.IdResponsavel ORDER BY Lhs.Data_Abertura_Processo DESC`)
  .then(result => {

    if(ultimoid_processo == result.recordset[0].IdProcesso){
      io.emit('novoProcesso',result.recordset[0]);
      console.log('executando novo processo')
    }else{
      ultimoid_processo = result.recordset[0].IdProcesso
      io.emit('novoProcesso',result.recordset[0]);
    }
  
  
    // console.log(result.recordset[0])
  })
  .catch(err => {
    console.log(err)
    return err;
  });
}

setInterval(() => {
  novoProcesso()
}, 20000);




  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })





  app.get('/diario', (req, res) => {

    // const d = new Date();
    // var day = DataHoje.getDay();
    // console.log(day)

    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    global.conn.request()
    .query(`SELECT * FROM vis_Metas_Diaria WHERE Dia_Abertura = ${day} AND Mes_Abertura = ${month} AND Ano_Abertura = ${year}`)
    .then(result => {

      res.json(result.recordset[0])
    })
    .catch(err => {
      console.log(err)
      return err;
    });

  

  })

  function getYearlyWeekNumber(date){
    let splitedDate = date.split("-")
    let dateObj = new Date(+splitedDate[0], +splitedDate[1]-1, +splitedDate[2], 0,0,0,0 )
    let firstDayYear = new Date(+splitedDate[0],0,1,0,0,0,0 )
    let yearDay = ((dateObj - firstDayYear) / 86400000)+1
    let weekInYear = +(String((yearDay + firstDayYear.getDay()+1) / 7).split(".")[0])
    return { date, yearDay, weekInYear }
   }

  app.get('/semanal', (req, res) => {

    // const d = new Date();
    // var day = DataHoje.getDay();
    // console.log(day)

    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    var semana = getYearlyWeekNumber(year+'-'+month+'-'+day).weekInYear+1


    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    global.conn.request()
    .query(`SELECT * FROM vis_Metas_Semanal WHERE Semana_Abertura = ${semana} AND Mes_Abertura = ${month} AND Ano_Abertura = ${year}`)
    .then(result => {
    
      res.json(result.recordset[0])
    })
    .catch(err => {
      console.log(err)
      return err;
    });

  

  })


  app.get('/mensal', (req, res) => {

    global.conn.request()
    .query(`SELECT * FROM vis_Metas_Mensal`)
    .then(result => {
     
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
      return err;
    });

  

  })

  app.get('/anual', (req, res) => {

    global.conn.request()
    .query(`SELECT * FROM vis_Metas_Anual`)
    .then(result => {
     
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
      return err;
    });

  

  })



  

  app.get('/ultimos', (req, res) => {

    global.conn.request()
    .query(`SELECT TOP 5
    FORMAT(Lhs.Data_Abertura_Processo , 'dd/MM/yyyy HH:mm') as data_Abertura_Convertido,
    Lhs.Numero_Processo,
    Lhs.Data_Abertura_Processo,
    Vnd.Nome as Vendedor,
    Vnd.Foto as Foto_Vendedor,
    Ins.Nome as InsideSales,
    Ins.Foto as Foto_InsideSales,
    Lms.Modalidade_Processo /*Aereo / MAritimo / Terrestre*/
  From
    mov_Logistica_House Lhs
  JOIN
    mov_Logistica_Master Lms on Lms.IdLogistica_Master = Lhs.IdLogistica_Master
  Left Outer JOIN
    vis_Funcionario Vnd on Vnd.IdPessoa = Lhs.IdVendedor
  Left Outer JOIN
    mov_Projeto_Atividade_Responsavel Par on Par.IdProjeto_Atividade = Lhs.IdProjeto_Atividade and (Par.IdPapel_Projeto = 12)
  Left Outer JOIN
    vis_Funcionario Ins on Ins.IdPessoa = Par.IdResponsavel ORDER BY Lhs.Data_Abertura_Processo DESC`)
    .then(result => {
     
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
      return err;
    });

  

  })


server.listen(port, function () {
    console.log(`Servidor Carregado http://localhost:${server.address().port}`);
});