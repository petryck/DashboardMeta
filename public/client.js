// <reference path="../phaser.d.ts" />
import geckos from '@geckos.io/client'

var channel;
var user_info;
var lista_espera_processos = [];
var sistema = new Date();
var diasistema= sistema.getDate();


setInterval(() => {
  var hoje = new Date();
var diahoje = sistema.getDate();

if(diahoje != diasistema){
  menu_dias()
  console.log('atualizou o dia')
}
  
}, 3600000);


setInterval(() => {

  if($('.dashboard_mensal').css('display') == 'none'){
    $('.dashboard_diario').css('display', 'none')
    $('.dashboard_mensal').css('display', 'block')
  }else{
    $('.dashboard_diario').css('display', 'block')
    $('.dashboard_mensal').css('display', 'none')
  }


  
  
}, 30000);



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

    channel.on('novoProcesso', (e) => {

      lista_espera_processos.push(e);

      

    })
})





setInterval(() => {

 if($('#status_new_pross').val() == 1 && lista_espera_processos.length > 0){
  executa_fila()
  $('#status_new_pross').val(2)
 }

}, 2000);

function executa_fila(){



    $('#nome_vendedor_foguete').text(lista_espera_processos[0].Vendedor)
      $('#img_vendedor_foguete').attr('src', lista_espera_processos[0].Foto_Vendedor)
      $('#img_inside_foguete').attr('src', lista_espera_processos[0].Foto_InsideSales)
      
      $('#nome_inside_foguete').text(lista_espera_processos[0].InsideSales)
      $('#numero_processo_foguete').text(lista_espera_processos[0].Numero_Processo)
      $('#data_processo_foguete').text(lista_espera_processos[0].data_Abertura_Convertido)
      
      ProcessoNovo()
      lista_novos_processos()
      lista_diario()
      lista_semanal()
      lista_anual()
      lista_mensal()
      // lista_espera_processos.shift();
      lista_espera_processos.splice(0, 1); 
      console.log(lista_espera_processos)

      setTimeout(() => {
        $('#status_new_pross').val(1)
      }, 15000);


      

}



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
console.log('foi')
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

lista_diario()
function lista_diario(){
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
}

menu_dias()

function menu_dias(){

  var data = new Date();
var data2 = new Date();
var min =  new Date(data.setDate(data.getDate() - 5));
var max =  new Date(data2.setDate(data2.getDate() + 5));

var dias = min.getDate();
var dias_nomes = ["domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
var mes_nomes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

for (let index = 0; index < 10; index++) {

  dias = new Date(min.setDate(min.getDate() + 1));

  if(index == 0){
    $('.DiasLateral').html('<div style="display: grid;" class="NumeroDias">'+dias.getDate()+' <span class="NomeMes">FEV</span><span class="NomeDia">Quarta-Feira</span></div>');
  }else{
    if(index == 4){
      $('.DiasLateral').append('<div style="display: block;" class="NumeroDias active">'+dias.getDate()+' <span class="NomeMes active">'+mes_nomes[dias.getMonth()]+'</span><span class="NomeDia active">'+dias_nomes[dias.getDay() % 7]+'</span></div>');
    }else{
      $('.DiasLateral').append('<div style="display: grid;" class="NumeroDias">'+dias.getDate()+' <span class="NomeMes">'+mes_nomes[dias.getMonth()]+'</span><span class="NomeDia">Quarta-Feira</span></div>');
    }
   
  }

}

}




lista_semanal()
function lista_semanal(){
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
}


lista_anual()
function lista_anual(){
  $.ajax({
    type: 'GET',
    url: '/anual',
    contentType: 'application/json',
    success: function (data) {
  
  $('#porcentagem_anual_ea').text(data[0].Porcentagem_EA)
  $('#porcentagem_anual_em').text(data[0].Porcentagem_EM)
  $('#porcentagem_anual_ia').text(data[0].Porcentagem_IA)
  $('#porcentagem_anual_im').text(data[0].Porcentagem_IM)

  

  $('#grafico_ea').css('stroke-dashoffset', 300-(data[0].Porcentagem_EA*3))
  $('#grafico_em').css('stroke-dashoffset', 300-(data[0].Porcentagem_EM*3))
  $('#grafico_ia').css('stroke-dashoffset', 300-(data[0].Porcentagem_IA*3))
  $('#grafico_im').css('stroke-dashoffset', 300-(data[0].Porcentagem_IM*3))


  
  console.log(data)
  
  
    }
  
  })
}


lista_mensal()
function lista_mensal(){
  $.ajax({
    type: 'GET',
    url: '/mensal',
    contentType: 'application/json',
    success: function (data) {
var mes_nomes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
 


  



$('.corpo_graficos').html('')
data.forEach(element => {

 
  var corpo_grafico = '<div class="row row_new">'
corpo_grafico += '<div class="col-3 colunaIA">'
corpo_grafico += '<div class="MesPai">'
corpo_grafico += '<div class="fundoCinza"></div>'
corpo_grafico += '<span class="MesAno">'+mes_nomes[element.Mes_Abertura - 1]+'</span>'
corpo_grafico += '<div class="progress">'
corpo_grafico += '<div class="progress-bar esquerda" role="progressbar" style="width: '+((element.IA*100)/element.IA_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_IA+'%</div>'
corpo_grafico += '</div>'
corpo_grafico += '<span class="MetaEscrito">'+element.IA+'/'+element.IA_Meta+'</span>'
corpo_grafico += '</div>'
corpo_grafico += '</div>'
corpo_grafico += '<div class="col-3 colunaIM">'
corpo_grafico += '<div class="MesPai">'
corpo_grafico += '<div class="progress">'
corpo_grafico += '<div class="progress-bar esquerda" role="progressbar" style="width: '+((element.IM*100)/element.IM_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_IM+'%</div>'
corpo_grafico += '</div>'
corpo_grafico += '<span class="MetaEscrito">'+element.IM+'/'+element.IM_Meta+'</span>'
corpo_grafico += '</div>'
corpo_grafico += '</div>'
corpo_grafico += '<div class="col-3 colunaEA">'
corpo_grafico += '<div class="MesPai">'
corpo_grafico += '<div class="progress">'
corpo_grafico += '<div class="progress-bar direita" role="progressbar" style="width: '+((element.EA*100)/element.EA_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_EA+'%</div>'
corpo_grafico += '</div>'
corpo_grafico += '<span class="MetaEscrito">'+element.EA+'/'+element.EA_Meta+'</span>'
corpo_grafico += '</div>'
corpo_grafico += '</div>'
corpo_grafico += '<div class="col-3 colunaEM">'
corpo_grafico += '<div class="MesPai">'
corpo_grafico += '<div class="progress">'
corpo_grafico += '<div class="progress-bar direita" role="progressbar" style="width: '+((element.EM*100)/element.EM_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_EM+'%</div>'
corpo_grafico += '</div>'
corpo_grafico += '<span class="MetaEscrito">'+element.EM+'/'+element.EM_Meta+'</span>'
corpo_grafico += '</div>'
corpo_grafico += '</div>'
corpo_grafico += '</div>'

  $('.corpo_graficos').append(corpo_grafico)
});
  
  // $('.porcentagem_IM').css('width', data.Porcentagem_EM+'%')
  // $('.porcentagem_IA').css('width', data.Porcentagem_IA+'%')
  // $('.porcentagem_EM').css('width', data.Porcentagem_IM+'%')
  
  // $('.porcentagem_IM').html(data.Porcentagem_EM+'%')
  // $('.porcentagem_IA').html(data.Porcentagem_IA+'%')
  // $('.porcentagem_EM').html(data.Porcentagem_IM+'%')
  
  // $('#MetaMensal1_numero').text(data.IM+'/'+data.IM_Meta)
  
  // $('#MetaMensal2_numero').text(data.IA+'/'+data.IA_Meta)
  
  // $('#MetaMensal3_numero').text(data.EM+'/'+data.EM_Meta)
  
  
    }
  
  })
}

lista_novos_processos()
function lista_novos_processos(){
  $.ajax({
    type: 'GET',
    url: '/ultimos',
    contentType: 'application/json',
    success: function (data) {
  
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
        corpo +='<img class="FotoSales" src="'+element.Foto_Vendedor+'">'
        corpo +='</div>'
        corpo +='<div id="cardFotoInside">'
        corpo +='<img class="FotoSales" src="'+element.Foto_InsideSales+'">'
        corpo +='</div>'
        corpo +='<h5 class="card-title">Nº <span class="TituloProcesso">'+element.Numero_Processo+' </span>'
        corpo +='<span class="DataProcesso"> '+element.data_Abertura_Convertido+'</span>'
        corpo +='</h5>'
        corpo +='<p class="card-text">Sales - '+element.Vendedor+'</p>'
        corpo +='<p class="card-text">Inside sales - '+element.InsideSales+'</p>'
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
}
