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

/*DASHBOARD DIARIO*/
$(document).on('click', '.NumeroDias', function(e){

  $('.NumeroDias').removeClass('active');
  $('.NomeMes').removeClass('active');
  $('.NomeDia').removeClass('active');

  $(this).addClass('active');
  $(this).find('.NomeMes').addClass('active');
  $(this).find('.NomeDia').addClass('active');
})


function ProcessoNovo_mostrar(){
  


  $('.ProcessoNovo').css('top','0');
  $('.rocket').css('top','20%');
}

function ProcessoNovo_esconder(){
  

  
  $('.ProcessoNovo').css('top','100%');
  $('.rocket').css('top','100%');
}

ProcessoNovo_mostrar()

setTimeout(() => {
  // ProcessoNovo_esconder()

    $('.textoProcesso').css('transform','scale(5)');

  
  // $('.exhaust-fumes li').css('left','-22px');
  // $('.exhaust-fumes li').css('width','1000px');
  // $('.exhaust-fumes li').css('height','1000px');
  
  
}, 5020);

/*DASHBOARD MENSAL*/
