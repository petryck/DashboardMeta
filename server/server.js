// import geckos from '@geckos.io/server'
import { Server } from "socket.io";
import mysql from 'mysql'
import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'
import http from 'http'



const server_http = http.Server(app);
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Console } from 'console'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const port = 3560
const io = new Server(server_http);
// const io = new Server(server)
// var io = require('socket.io')(http);




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


server_http.lastPlayderID = 0;
var players = [];
var ultimoid_processo = 0;

// io.addServer(server)

// io.onConnection(channel => {
//   server.on("connection", (channel) => {

//   console.log('conectou geral')
    
//   channel.on('ready', data => {
//     console.log('conectou')

//     channel.player = {
//       id: data.id,
//       nome: data.nome,
//       token:data.token
//   }; 


//   channel.broadcast.emit('novoProcesso','dsadsa');
  
//   })

    

//     channel.on('SendMessege', data => {

//       var saida_player = {
//         id: channel.player.id,
//         msg: data,
//         name: channel.player.name
//     };
//     console.log(saida_player)

//     channel.broadcast.emit('SendMessege',saida_player);
//     })

    
    

//     channel.onDisconnect(() => {
//       // console.log(channel)
   
//       console.log(channel.player.id+' removido')

   
//       io.emit('remove',channel.player.id);
    

//      players = players.filter((item) => item.id !== channel.player.id);
  
      
//     })

//       channel.emit('ready') 

// })


io.on("connection", (socket) => {
// console.log(socket)
});


  


function novoProcesso(){

  global.conn.request()
  .query(`SELECT TOP 1
  FORMAT(Lhs.Data_Abertura_Processo , 'dd/MM/yyyy HH:mm') as data_Abertura_Convertido,
  Lhs.Numero_Processo,
  Lhs.IdLogistica_House as IdProcesso,
  Lhs.Data_Abertura_Processo,
  LEFT(Vnd.Nome, CHARINDEX(' ', Vnd.Nome, 1) - 1) as Vendedor,
  Vnd.Foto as Foto_Vendedor,
  Ins.Nome as InsideSales,
  Ins.Foto as Foto_InsideSales,
  Lms.Modalidade_Processo, /*Aereo / MAritimo / Terrestre*/
  Case
    When Fnc.IdEmpresa = 1 Then 'itj'
    When Fnc.IdEmpresa = 3 Then 'nh'
  End as Empresa
From
  mov_Logistica_House Lhs
JOIN
  mov_Logistica_Master Lms on Lms.IdLogistica_Master = Lhs.IdLogistica_Master
Left Outer JOIN
  vis_Funcionario Vnd on Vnd.IdPessoa = Lhs.IdVendedor
Left Outer JOIN
  mov_Projeto_Atividade_Responsavel Par on Par.IdProjeto_Atividade = Lhs.IdProjeto_Atividade and (Par.IdPapel_Projeto = 12)
Left Outer JOIN
  vis_Funcionario Ins on Ins.IdPessoa = Par.IdResponsavel 
Join
  vis_Funcionario Fnc on Fnc.IdPessoa = Lhs.IdVendedor WHERE Lhs.Agenciamento_Carga = 1 ORDER BY Lhs.Data_Abertura_Processo DESC`)
  .then(result => {

 


   
    if(ultimoid_processo == result.recordset[0].IdProcesso){
      // io.emit('novoProcesso',result.recordset[0]);
   
    }else{
   console.log('new_processo')
      ultimoid_processo = result.recordset[0].IdProcesso;
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
}, 5000);




  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/entrada/index.html'))
  })

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })


  app.get('/itj', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/itj/index.html'))
  })
  app.get('/nh', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/nh/index.html'))
  })
  app.get('/sp', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sp/index.html'))
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

        if(req.query.filial == 'itj'){

          global.conn.request()
          .query(`SELECT * FROM vis_Metas_Diaria_ITJ WHERE Dia_Abertura = ${day} AND Mes_Abertura = ${month} AND Ano_Abertura = ${year}`)
          .then(result => {
      
            res.json(result.recordset[0])
          })
          .catch(err => {
            console.log(err)
            return err;
          });

        }else if(req.query.filial == 'nh'){

          global.conn.request()
          .query(`SELECT * FROM vis_Metas_Diaria_NH WHERE Dia_Abertura = ${day} AND Mes_Abertura = ${month} AND Ano_Abertura = ${year}`)
          .then(result => {
      
            res.json(result.recordset[0])
          })
          .catch(err => {
            console.log(err)
            return err;
          });
        }
   

  

  })

  // function getYearlyWeekNumber(date){
  //   let splitedDate = date.split("-")
  //   let dateObj = new Date(+splitedDate[0], +splitedDate[1]-1, +splitedDate[2], 0,0,0,0 )
  //   let firstDayYear = new Date(+splitedDate[0],0,1,0,0,0,0 )
  //   let yearDay = ((dateObj - firstDayYear) / 86400000)+1
  //   let weekInYear = +(String((yearDay + firstDayYear.getDay()+1) / 7).split(".")[0])
  //   console.log(date, yearDay, weekInYear)
  //   return { date, yearDay, weekInYear }
    
  //  }

   function getYearlyWeekNumber(date) {
    var date = new Date(date); 
    /* var date = new Date('2023-03-20').toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}); */
    date.setHours(0, 0, 0, 0); 
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 7) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    


  //  function getYearlyWeekNumber(date){
  //   var currentdate = new Date(date);
  //   var oneJan = new Date(currentdate.getFullYear(),0,1);
  //   var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  //   var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  //   console.log(currentdate)
  //   // console.log(`The week number of the current date (${currentdate}) is ${result}.`);

  //   return result
    
  //  }



  //  function semana(ano,mes,dia) {
  //   function serial(dias) { return 86400000*dias; }
  //   function dateserial(ano,mes,dia) { return (new Date(ano,mes-1,dia).valueOf()); }
  //   function weekdia(date) { return (new Date(date)).getDay()+1; }
  //   function anoserial(date) { return (new Date(date)).getFullYear(); }
  //   var date = ano instanceof Date ? ano.valueOf() : typeof ano === "string" ? new Date(ano).valueOf() : dateserial(ano,mes,dia), 
  //       date2 = dateserial(anoserial(date - serial(weekdia(date-serial(1))) + serial(4)),1,3);
  //   return ~~((date - date2 + serial(weekdia(date2) + 5))/ serial(7));
  // }

  // semana('2022','03','19')


  app.get('/semanal', (req, res) => {
    
  
    // const d = new Date();
    // var day = DataHoje.getDay();
    // console.log(day)

    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    // var semana = getYearlyWeekNumber(year+'-'+month+'-'+day).weekInYear
    var semana = getYearlyWeekNumber(year+'-'+month+'-'+day);
    // var semana_temp = getYearlyWeekNumber(year+'-'+month+'-'+day);


    // console.log('semana temp ↓')
    // console.log(semana_temp)

   


    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

        if(req.query.filial == 'itj'){

          global.conn.request()
          .query(`SELECT * FROM vis_Metas_Semanal_ITJ WHERE Semana_Abertura = ${semana} AND Ano_Abertura = ${year}`)
          .then(result => {
        
            res.json(result.recordset[0])
          })
          .catch(err => {
            console.log(err)
            return err;
          });

        }else if(req.query.filial == 'nh'){

          global.conn.request()
          .query(`SELECT * FROM vis_Metas_Semanal_NH WHERE Semana_Abertura = ${semana} AND Ano_Abertura = ${year}`)
          .then(result => {
        
            res.json(result.recordset[0])
          })
          .catch(err => {
            console.log(err)
            return err;
          });

        }
   

  

  })


  app.get('/mensal', (req, res) => {

    if(req.query.filial == 'itj'){

      global.conn.request()
    .query(`SELECT * FROM vis_Metas_Mensal_ITJ`)
    .then(result => {
     
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
      return err;
    });

    }else if(req.query.filial == 'nh'){

      global.conn.request()
      .query(`SELECT * FROM vis_Metas_Mensal_NH`)
      .then(result => {
       
        res.json(result.recordset)
      })
      .catch(err => {
        console.log(err)
        return err;
      });

    }
    

  

  })

  app.get('/anual', (req, res) => {
    
    
if(req.query.filial == 'itj'){

  global.conn.request()
  .query(`SELECT * FROM vis_Metas_Anual_ITJ`)
  .then(result => {
   
    res.json(result.recordset)
  })
  .catch(err => {
    console.log(err)
    return err;
  });
}else if(req.query.filial == 'nh'){

  global.conn.request()
  .query(`SELECT * FROM vis_Metas_Anual_NH`)
  .then(result => {
   
    res.json(result.recordset)
  })
  .catch(err => {
    console.log(err)
    return err;
  });
}
   

  

  })



  

  app.get('/ultimos', (req, res) => {

    if(req.query.filial == 'itj'){

      global.conn.request()
      .query(`SELECT TOP 4
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
      vis_Funcionario Ins on Ins.IdPessoa = Par.IdResponsavel 
    Join
      vis_Funcionario Fnc on Fnc.IdPessoa = Lhs.IdVendedor and (Fnc.IdEmpresa = 1) WHERE Lhs.Agenciamento_Carga = 1 ORDER BY Lhs.Data_Abertura_Processo DESC`)
      .then(result => {
       
        res.json(result.recordset)
      })
      .catch(err => {
        console.log(err)
        return err;
      });


    }else if(req.query.filial == 'nh'){

      global.conn.request()
      .query(`SELECT TOP 4
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
      vis_Funcionario Ins on Ins.IdPessoa = Par.IdResponsavel 
    Join
      vis_Funcionario Fnc on Fnc.IdPessoa = Lhs.IdVendedor and (Fnc.IdEmpresa = 3) WHERE Lhs.Agenciamento_Carga = 1 ORDER BY Lhs.Data_Abertura_Processo DESC`)
      .then(result => {
       
        res.json(result.recordset)
      })
      .catch(err => {
        console.log(err)
        return err;
      });

  
    }
    
  

  })



  server_http.listen(port, function () {
    console.log(`Servidor Carregado http://localhost:${server_http.address().port}`);
});