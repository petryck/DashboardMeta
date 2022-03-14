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


// ProcessoNovo()
// setInterval(() => {
//   ProcessoNovo()
// }, 16020);

/*DASHBOARD MENSAL*/


function calcular_grafico(valor0, valor1){
  var calcular_ = ((valor0*180)/valor1);
 
  if(calcular_ > 180){
    return 180
  }else{
    return calcular_;
  }

  
}


$.ajax({
  type: 'GET',
  url: '/diario',
  contentType: 'application/json',
  success: function (data) {


$('.number_im').html(data.IM +'/'+ data.IM_Meta)
$('.number_ia').html(data.IA +'/'+ data.IA_Meta)
$('.number_em').html(data.EM +'/'+ data.EM_Meta)



var calc_im = 'rotate('+calcular_grafico(data.IM, data.IM_Meta)+'deg'+')';
var calc_ia = 'rotate('+calcular_grafico(data.IA, data.IA_Meta)+'deg'+')';
var calc_em = 'rotate('+calcular_grafico(data.EM, data.EM_Meta)+'deg'+')';

$('#im_grafico').css('transform', calc_im)
$('#ia_grafico').css('transform', calc_ia)
$('#em_grafico').css('transform', calc_em)










  }

})

var data = new Date();
var data2 = new Date();
var min =  new Date(data.setDate(data.getDate() - 5));
var max =  new Date(data2.setDate(data2.getDate() + 5));
console.log(min.getDate(), max.getDate())
var dias = min.getDate();
var dias_nomes = ["domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

for (let index = 0; index < 10; index++) {

  dias = new Date(min.setDate(min.getDate() + 1));

  if(index == 0){
    $('.DiasLateral').html('<div style="display: grid;" class="NumeroDias">'+dias.getDate()+' <span class="NomeMes">FEV</span><span class="NomeDia">Quarta-Feira</span></div>');
  }else{
    if(index == 4){
      $('.DiasLateral').append('<div style="display: block;" class="NumeroDias active">'+dias.getDate()+' <span class="NomeMes active">FEV</span><span class="NomeDia active">'+dias_nomes[dias.getDay() % 7]+'</span></div>');
    }else{
      $('.DiasLateral').append('<div style="display: grid;" class="NumeroDias">'+dias.getDate()+' <span class="NomeMes">FEV</span><span class="NomeDia">Quarta-Feira</span></div>');
    }
   
  }

}



$.ajax({
  type: 'GET',
  url: '/semanal',
  contentType: 'application/json',
  success: function (data) {



$('.porcentagem_IM').css('width', data.Porcentagem_EM+'%')
$('.porcentagem_IA').css('width', data.Porcentagem_IA+'%')
$('.porcentagem_EM').css('width', data.Porcentagem_IM+'%')

$('.porcentagem_IM').html(data.Porcentagem_EM+'%')
$('.porcentagem_IA').html(data.Porcentagem_IA+'%')
$('.porcentagem_EM').html(data.Porcentagem_IM+'%')

$('#MetaMensal1_numero').text(data.IM+'/'+data.IM_Meta)

$('#MetaMensal2_numero').text(data.IA+'/'+data.IA_Meta)

$('#MetaMensal3_numero').text(data.EM+'/'+data.EM_Meta)


  }

})


$.ajax({
  type: 'GET',
  url: '/ultimos',
  contentType: 'application/json',
  success: function (data) {

    console.log(data.length)
    var contagem = 0;
    data.forEach(element => {
    var img_modal = '';
if(element.Modalidade_Processo == 1){
  img_modal = 'airPlaneIcon';
}else if(element.Modalidade_Processo == 2){
  img_modal = 'shipicon';
}else if(element.Modalidade_Processo == 3){
  img_modal = 'shipicon';
}

      var corpo = '<div class="card mb-3" style="max-width: 700px;">'
      corpo +='<div class="card-body text-dark">'
      corpo +='<div id="cardFotoSales">'
      corpo +='<img class="FotoSales" src="http://chronus-dc.ddns.net:8070/chronus/assets/img/colaboradores/116.jpeg">'
      corpo +='</div>'
      corpo +='<div id="cardFotoInside">'
      corpo +='<img class="FotoSales" src="http://chronus-dc.ddns.net:8070/chronus/assets/img/colaboradores/39.jpeg">'
      corpo +='</div>'
      corpo +='<h5 class="card-title">Nº <span class="TituloProcesso">IM1008-22 </span>'
      corpo +='<span class="DataProcesso"> 09.03.22 - 22:44H</span>'
      corpo +='</h5>'
      corpo +='<p class="card-text">Sales - MATEUS RIBEIRO</p>'
      corpo +='<p class="card-text">Inside sales - PETRYCK WILLIAN</p>'
      corpo +='<img class="iconsProcesso" src="icons/'+img_modal+'.svg">'
      corpo +='</div>'
      corpo +='</div>'



      if(contagem == 0){
        $('.TopProcesso').html(corpo)
     
      }else{
        $('.TopProcesso').append(corpo)
     
      }
       
       
      contagem++;
    });
  


  }

})
