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

  $('.ProcessoNovo').css('opacity','1');
  $('.rocket').css('opacity','1');
  $('.ProcessoNovo').css('top','0');
  $('.rocket').css('top','20%');
}

function ProcessoNovo_esconder(){
  $('.ProcessoNovo').css('top','100%');
  $('.rocket').css('top','100%');
}

function ProcessoNovo(){

setTimeout(() => {
  // ProcessoNovo_esconder()
    ProcessoNovo_mostrar()

    $('.textoProcesso').css('opacity','1');
    $('#canvas').css('opacity','0.7');
    $('.Transparente').css('filter','blur(8px)');
}, 5020);

setTimeout(() => {
  $('.textoProcesso').css('transform','scale(5)');
  $('#canvas').css('opacity','0.7');
  $('.Transparente').css('filter','blur(8px)');
}, 6020);


setTimeout(() => {
   $('.textoProcesso').css('opacity','0');
    $('#canvas').css('opacity','0');
    $('.Transparente').css('filter','blur(0px)');

}, 12020);

setTimeout(() => {
  $('.textoProcesso').css('transform','scale(0)');
}, 14020);

setTimeout(() => {
  $('.rocket').css('top','-100%');
}, 14020);

setTimeout(() => {

  $('.ProcessoNovo').css('opacity','0');
  $('.rocket').css('opacity','0');

  $('.ProcessoNovo').css('top','100%');
  $('.rocket').css('top','100%');
}, 17020);
}


ProcessoNovo()
setInterval(() => {
  ProcessoNovo()
}, 16020);

/*DASHBOARD MENSAL*/
