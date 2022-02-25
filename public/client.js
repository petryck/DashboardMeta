// <reference path="../phaser.d.ts" />
import geckos from '@geckos.io/client'

var channel;
var user_info;


channel = geckos({ port: 3560 })

var infos = {
  id:1,
  nome:'Petryck',
  token: 'dsadsadsa'
}

localStorage.setItem( 'info_usuario', JSON.stringify(infos) );


user_info = JSON.parse(localStorage.getItem("info_usuario"));



        channel.onConnect(error => {
          if (error) console.error(error.message)
    
          
          channel.emit('ready',user_info);

    channel.on('ready', () => {

    })
})
