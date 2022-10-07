// import { io } from "socket.io-client";
var lista_espera_processos = [];
var channel = io();
// var audio_fechamento = $("#audio1").get(0); 
var audio_fechamento = document.getElementById('audio1')



// $('#audio1').click();
// setTimeout(() => {
//   audio_fechamento.play();
// }, 3000);



// audio_fechamento.click()
// audio_fechamento.play();
// // var audio_fechamento = new Audio('../assets/fechamento.mp3');
// audio_fechamento.pause();

// var audioElement = document.createElement('audio');
// audioElement.setAttribute('src', '../assets/fechamento.mp3');

// audioElement.addEventListener('ended', function() {
//     this.play();
// }, false);

// audioElement.addEventListener("canplay",function(){
//     $("#length").text("Duration:" + audioElement.duration + " seconds");
//     $("#source").text("Source:" + audioElement.src);
//     $("#status").text("Status: Ready to play").css("color","green");
// });

// audioElement.addEventListener("timeupdate",function(){
//     $("#currentTime").text("Current second:" + audioElement.currentTime);
// });


// audio_fechamento.pause();
// setTimeout(() => {
//  audioElement.play();
// }, 3000);
 


channel.on('novoProcesso', (e) => {

    if(filial == e.Empresa){

    lista_espera_processos.push(e);
   
    }

  })


setInterval(() => {

    if(lista_espera_processos.length > 0){
     executa_fila()
    //  $('#status_new_pross').val(2)
    }
   
}, 14000);


function executa_fila(){
  audio_fechamento.play();
  'http://cdn.conlinebr.com.br/consultaColab?id=${element.IdVendedor}'
    $('#nome_vendedor_foguete').text(lista_espera_processos[0].Vendedor)
      $('#img_vendedor_foguete').attr('src', 'http://cdn.conlinebr.com.br/consultaColab?id='+lista_espera_processos[0].IdVendedor)
      $('#img_inside_foguete').attr('src', 'http://cdn.conlinebr.com.br/consultaColab?id='+lista_espera_processos[0].IdInside)
      
      $('#nome_inside_foguete').text(lista_espera_processos[0].InsideSales)
      $('#numero_processo_foguete').text(lista_espera_processos[0].Numero_Processo)
      $('#data_processo_foguete').text(lista_espera_processos[0].data_Abertura_Convertido)


    //   ProcessoNovo()
    

    
       
        ProcessoNovo_mostrar()
        lista_novos_processos(lista_espera_processos[0].Empresa)
        lista_diario(lista_espera_processos[0].Empresa)
        lista_semanal(lista_espera_processos[0].Empresa)
        lista_anual(lista_espera_processos[0].Empresa)
        lista_mensal(lista_espera_processos[0].Empresa)
        // lista_espera_processos.shift();
        lista_espera_processos.splice(0, 1); 
      //   console.log(lista_espera_processos)
  
      //   setTimeout(() => {
      //     $('#status_new_pross').val(1)
      //   }, 15000);
    
      

 

      

}


function ProcessoNovo_mostrar(){
    $('.ProcessoNovo').css('display','block');
    $('#canvas').css('display','block');
    $('.ProcessoNovo').css('z-index','3');
    $('.ProcessoNovo').css('opacity','1');
    $('.rocket').css('opacity','1');
    $('.ProcessoNovo').css('top','0');
    $('.rocket').css('top','20%');

    $('.textoProcesso').css('opacity','1');
    $('#canvas').css('z-index','2');
    $('#canvas').css('opacity','0.7');
    $('.Transparente').css('filter','blur(8px)');

    setTimeout(() => {
        $('.textoProcesso').css('transform','scale(5)');
    }, 3000);


    setTimeout(() => {
        $('.textoProcesso').css('transform','scale(0)');
         $('#canvas').css('opacity','0');
         $('.rocket').css('top','-100%');
                setTimeout(() => {
                    ProcessoNovo_esconder()
                    }, 2000);
     }, 12000);

    // setTimeout(() => {
    //     ProcessoNovo_esconder()
    // }, 5000);
  }
  

  function ProcessoNovo_esconder(){
    $('.ProcessoNovo').css('opacity','0');
    $('#canvas').css('opacity','0');
    $('#canvas').css('z-index','1');
    $('.ProcessoNovo').css('z-index','1');
    $('.ProcessoNovo').css('top','100%');
    $('.rocket').css('top','100%');
    audio_fechamento.pause();
    audio_fechamento.currentTime = 0
    
  }

setInterval(() => {

    location.reload(true)
  }, 7200000);

var metricas_automaticas = true;
var contagem_metricas = 0

setInterval(() => {

   if(metricas_automaticas == true){


    if(contagem_metricas == 0){
      $('.metricas').css('display', 'none')
	    $('.metricas_semanal').css('display', 'block')
      contagem_metricas++;
    }else if(contagem_metricas == 1){
      $('.metricas').css('display', 'none')
	    $('.metricas_mensal').css('display', 'block')
      contagem_metricas++;
    }else if(contagem_metricas == 2){
      $('.metricas').css('display', 'none')
	    $('.metricas_financeiras').css('display', 'block')
      contagem_metricas = 0;
    }

    // if($('.metricas_semanal').css('display') == 'none'){
    //     $('.metricas_semanal').css('display', 'block')
    //     $('.metricas_mensal').css('display', 'none')
    //   }else{
    //     $('.metricas_semanal').css('display', 'none')
    //     $('.metricas_mensal').css('display', 'block')
    //   }
   }
  

  }, 30000);



  $(document).on('click', '#metricas_automaticas', function(e){

    if($('#metricas_automaticas_pai').attr('checked')){
        metricas_automaticas = false;
        $('#metricas_automaticas_pai').attr('checked', false)
        notif({
            type: "warning",
            msg: "Métricas automaticas desativada",
            position: "left"
        });
      
    }else{
        metricas_automaticas = true;
        $('#metricas_automaticas_pai').attr('checked', true)
        notif({
            type: "warning",
            msg: "Troca automatica de métricas ativada a cada 30 segundos.",
            position: "left"
        });
    }
    console.log('Métricas automaticas '+metricas_automaticas )
   
  })



function menu_dias(){

    var data = new Date();
  var data2 = new Date();
  var min =  new Date(data.setDate(data.getDate() - 6));
  var max =  new Date(data2.setDate(data2.getDate() + 6));
  
  var dias = min.getDate();
  var dias_nomes = ["domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
  var mes_nomes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
  
  $('.Dias_lateral').html('');
  for (let index = 0; index < 13; index++) {
  
    dias = new Date(min.setDate(min.getDate() + 1));
  
    if(index == 0){
        $('.Dias_lateral').append(' <div class="card-header NumeroDias_lateral" ><center><h3  class="card-title">'+dias.getDate()+' <span class="mes_lateral">'+mes_nomes[dias.getMonth()]+'</span></h3></center><center><h6  class="card-title">'+dias_nomes[dias.getDay() % 7]+'</h6></center> </div>');
    }else{
      if(index == 5){
        $('.Dias_lateral').append(' <div class="card-header hoje_lateral NumeroDias_lateral" ><center><h3  class="card-title">'+dias.getDate()+' <span class="mes_lateral">'+mes_nomes[dias.getMonth()]+'</span></h3></center><center><h6  class="card-title">'+dias_nomes[dias.getDay() % 7]+'</h6></center> </div>');
      }else{
        $('.Dias_lateral').append(' <div class="card-header NumeroDias_lateral" ><center><h3  class="card-title">'+dias.getDate()+' <span class="mes_lateral">'+mes_nomes[dias.getMonth()]+'</span></h3></center><center><h6  class="card-title">'+dias_nomes[dias.getDay() % 7]+'</h6></center> </div>');
      }
     
    }
  
  }
  
  }

  function lista_novos_processos(filial){
    $.ajax({
      type: 'GET',
      url: '/ultimos',
      data:{filial:filial},
      contentType: 'application/json',
      success: function (data) {
        console.log('aqui')
        console.log(data)
    
        var contagem = 0;
        data.forEach(element => {
          console.log(element.IdVendedor)
        var img_modal = '';
    if(element.Modalidade_Processo == 1){
      img_modal = 'airPlaneIcon';
    }else if(element.Modalidade_Processo == 2){
      img_modal = 'shipIcon';
    }else if(element.Modalidade_Processo == 3){
      img_modal = 'shipIcon';
    }

          var corpo = `<div class="card-body" style="padding-bottom: 23px;padding-top: 7px;">
          <div class="row">
             <div class="col-xl-1 col-lg-1 feature">

             

                <div class="fa-lg  border mb-3" style="display: block;background-image: url('http://cdn.conlinebr.com.br/consultaColab?id=${element.IdVendedor}');background-size: cover;width: 79px;height: 79px;"> </div>
                <div class=" fa-lg  border  mb-3" style="display: block;background-image: url('http://cdn.conlinebr.com.br/consultaColab?id=${element.IdInside}');background-size: cover;width: 79px;height: 79px;"> </div>
             </div>
             
             <div class="col-xl-10 col-lg-9" style="margin-left: 35px;">
                <div class="mt-1">
                  
                  <img style="width: 39px;position: absolute;right: 177px;top: 1px;" src="../assets/images/svgs/${img_modal}.svg" alt="">
                   <div class="corpo_fechamento" style="position: absolute;bottom: 103px;font-size: 24px;">
                      <p class="mb-0"><b style="font-size: 18px;">Sales </b> <br> 
                      ${element.Vendedor}
                    </p>
                   </div>
                   <div class="corpo_fechamento" style="position: absolute;bottom: 7px;font-size: 24px;">
                      <p class="mb-0"><b style="font-size: 18px;">Inside sales</b> <br> ${element.InsideSales}</p>
                   </div>

                   <h4 style="position: absolute;right: 0;">Nº  <span style="font-size: 27px;font-weight: 800 !important;">${element.Numero_Processo}</span></h4>
                   <span style="font-size: 20px;margin-left: 368px;position: absolute;right: 0;bottom: 13px;">${element.data_Abertura_Convertido}</span>

                   <!-- <div class="avatar-list avatar-list-stacked avatar_operacional">
                    <span class="avatar bradius cover-image" data-bs-image-src="https://conlinebr.com.br/colab/41.jpeg" style="background: url(https://conlinebr.com.br/colab/41.jpeg) center center;"></span>
                    <span class="avatar bradius cover-image" data-bs-image-src="https://conlinebr.com.br/colab/41.jpeg" style="background: url(https://conlinebr.com.br/colab/41.jpeg) center center;"></span>
                    <span class="avatar bradius cover-image" data-bs-image-src="https://conlinebr.com.br/colab/41.jpeg" style="background: url(https://conlinebr.com.br/colab/41.jpeg) center center;"></span>
                    <span class="avatar bradius cover-image" data-bs-image-src="https://conlinebr.com.br/colab/41.jpeg" style="background: url(https://conlinebr.com.br/colab/41.jpeg) center center;"></span>
                    <span class="avatar bradius cover-image" data-bs-image-src="https://conlinebr.com.br/colab/41.jpeg" style="background: url(https://conlinebr.com.br/colab/41.jpeg) center center;"></span>
                    <span class="avatar bradius bg-primary">+8</span>
                   </div> -->
                 

                   <!-- <h4 class="fw-semibold" style="font-size: 21px;">
                      Nº  
                      <span style="font-size: 27px;font-weight: 800 !important;">IM0734-22</span>
                      <span style="font-size: 20px;margin-left: 368px;">08/04/2022 15:44</span>
                  </h4> -->

                </div>
                
             </div>
             
          </div>

          
          
       </div>`;




    
    
    
          if(contagem == 0){
            $('.corpo_top_processos').html(corpo)
         
          }else{
            $('.corpo_top_processos').append(corpo)
         
          }
           
           
          contagem++;
        });
      
    
    
      }
    
    })
  }

  function lista_financeiro_anual(filial){
    $.ajax({
      type: 'GET',
      url: '/metricas_financeira_Anual',
      data:{filial:filial},
      contentType: 'application/json',
      success: function (data) {
        console.log(data)
   

        // $('#porcentagem_meta01').text(data.PorcentagemMeta1)
        // if(data.PorcentagemMeta1 > 100){

        //     if(data.PorcentagemMeta2 < 100){
        //       $('#porcentagem_meta02').text(data.PorcentagemMeta2)
        //       $('#porcentagem_meta03').text('0')
        //     }else{
        //       $('#porcentagem_meta03').text(data.PorcentagemMeta3)
        //     }
          
        // }else{
        //   $('#porcentagem_meta02').text('0')
        //   $('#porcentagem_meta03').text('0')
        // }

        $('#porcentagem_meta01').text(data.PorcentagemMeta1)
        $('#porcentagem_meta02').text(data.PorcentagemMeta2)
        $('#porcentagem_meta03').text(data.PorcentagemMeta3)


        $('#grafico_meta01').css('stroke-dashoffset', 300-(data.PorcentagemMeta1*3))
        $('#grafico_meta02').css('stroke-dashoffset', 300-(data.PorcentagemMeta2*3))
        $('#grafico_meta03').css('stroke-dashoffset', 300-(data.PorcentagemMeta3*3))

        $('#porcentagem_meta_hoje01').text(data.PorcentagemMeta1Hoje)
        $('#porcentagem_meta_hoje02').text(data.PorcentagemMeta2Hoje)
        $('#porcentagem_meta_hoje03').text(data.PorcentagemMeta3Hoje)

        $('#grafico_meta_hoje01').css('stroke-dashoffset', 300-(data.PorcentagemMeta1Hoje*3))
        $('#grafico_meta_hoje02').css('stroke-dashoffset', 300-(data.PorcentagemMeta2Hoje*3))
        $('#grafico_meta_hoje03').css('stroke-dashoffset', 300-(data.PorcentagemMeta3Hoje*3))
        


      }
    })
  }


  function lista_financeiro_mensal(filial){
    $.ajax({
      type: 'GET',
      url: '/metricas_financeira_Mensal',
      data:{filial:filial},
      contentType: 'application/json',
      success: function (data) {


  $('.corpo_financeiro_meta_01').html('')
  $('.corpo_financeiro_meta_02').html('')
  $('.corpo_financeiro_meta_03').html('')

  data.forEach(element => {
  

var progressbar = ` <div class="row" style="margin-top: 11px">
<div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
    <div class="progress-bar esquerda" role="progressbar" style="width: ${element.PorcentagemMeta1}%;background: linear-gradient(135deg, #f3e2c7 0%, #c19e67 50%, #b68d4c 51%, #e9d4b3 100%);" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.PorcentagemMeta1} %</span></div>
</div>

</div>`

$('.corpo_financeiro_meta_01').append(progressbar)


var progressbar = ` <div class="row" style="margin-top: 11px">
<div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
    <div class="progress-bar esquerda" role="progressbar" style="width: ${element.PorcentagemMeta2}%;background: linear-gradient(135deg, #e6e6e6 0%, #d9d9d9 50%, #cbcbcb 51%, #dddddd 100%);" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.PorcentagemMeta2} %</span></div>
</div>

</div>`

$('.corpo_financeiro_meta_02').append(progressbar)


var progressbar = ` <div class="row" style="margin-top: 11px">
<div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
    <div class="progress-bar esquerda" role="progressbar" style="width: ${element.PorcentagemMeta3}%;background: linear-gradient(135deg, #fceabb 0%, #fccd4d 50%, #f8b500 51%, #fbdf93 100%);" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.PorcentagemMeta3} %</span></div>
</div>

</div>`

$('.corpo_financeiro_meta_03').append(progressbar)

  });
    
    
      }
    
    })
  }

  function lista_mensal(filial){
    $.ajax({
      type: 'GET',
      url: '/mensal',
      data:{filial:filial},
      contentType: 'application/json',
      success: function (data) {
  var mes_nomes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
   
  
  
  $('.corpo_grafico_impo_aerea').html('')
  $('.corpo_grafico_impo_maritima').html('')
  $('.corpo_grafico_expo_aerea').html('')
  $('.corpo_grafico_expo_maritima').html('')
  data.forEach(element => {
  

  var progressbar = ` <div class="row" style="margin-top: 11px">
                        <div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
                            <div class="progress-bar esquerda" role="progressbar" style="width: ${((element.IA*100)/element.IA_Meta)}%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.Porcentagem_IA}%</span></div>
                        
                            </div>
                            <span class="MetaEscrito" style="font-size: 16px;font-weight: 600;margin-top: 4px;margin-left: -5px;width: auto;">${element.IA+'/'+element.IA_Meta}</span>
                        
                        </div>`
  
$('.corpo_grafico_impo_aerea').append(progressbar)


var progressbar = ` <div class="row" style="margin-top: 11px">
<div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
    <div class="progress-bar esquerda" role="progressbar" style="width: ${((element.IM*100)/element.IM_Meta)}%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.Porcentagem_IM}%</span></div>
</div>
<span class="MetaEscrito" style="font-size: 16px;font-weight: 600;margin-top: 4px;margin-left: -5px;width: auto;">${element.IM+'/'+element.IM_Meta}</span>
</div>`

$('.corpo_grafico_impo_maritima').append(progressbar)


var progressbar = ` <div class="row" style="margin-top: 11px">
<div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
    <div class="progress-bar esquerda" role="progressbar" style="width: ${((element.EA*100)/element.EA_Meta)}%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.Porcentagem_EA}%</span></div>
</div>
<span class="MetaEscrito" style="font-size: 16px;font-weight: 600;margin-top: 4px;margin-left: -5px;width: auto;">${element.EA+'/'+element.EA_Meta}</span>
</div>`

$('.corpo_grafico_expo_aerea').append(progressbar)


var progressbar = ` <div class="row" style="margin-top: 11px">
<div class="progress" style="width: 69%;padding: 0;margin: 0;margin-left: 32px;height: 31px;">
    <div class="progress-bar esquerda" role="progressbar" style="width: ${((element.EM*100)/element.EM_Meta)}%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>${element.Porcentagem_EM}%</span></div>
</div>
<span class="MetaEscrito" style="font-size: 16px;font-weight: 600;margin-top: 4px;margin-left: -5px;width: auto;">${element.EM+'/'+element.EM_Meta}</span>
</div>`

$('.corpo_grafico_expo_maritima').append(progressbar)

  });
    
    
      }
    
    })
  }


  function lista_anual(filial){
    $.ajax({
      type: 'GET',
      url: '/anual',
      data:{filial:filial},
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

  function calcular_grafico(valor0, valor1){
    var calcular_ = ((valor0*180)/valor1);
   
    if(calcular_ > 180){
      return 180
    }else{
      return calcular_;
    }
  
    
  }

  function lista_diario(filial){
    $.ajax({
      type: 'GET',
      url: '/diario',
      data:{filial:filial},
      contentType: 'application/json',
      success: function (data) {
    
    
    $('.number_im').html(data.IM +'/'+ data.IM_Meta)
    $('.number_ia').html(data.IA +'/'+ data.IA_Meta)
    $('.number_ea').html(data.EA +'/'+ data.EA_Meta)
    $('.number_em').html(data.EM +'/'+ data.EM_Meta)
    
    
    var calc_ia = 'rotate('+calcular_grafico(data.IA, data.IA_Meta)+'deg'+')';
    var calc_im = 'rotate('+calcular_grafico(data.IM, data.IM_Meta)+'deg'+')';
    var calc_ea = 'rotate('+calcular_grafico(data.EA, data.EA_Meta)+'deg'+')';
    var calc_em = 'rotate('+calcular_grafico(data.EM, data.EM_Meta)+'deg'+')';


    $('#ia_grafico').css('transform', calc_ia)
    $('#im_grafico').css('transform', calc_im)
    $('#ea_grafico').css('transform', calc_ea)
    $('#em_grafico').css('transform', calc_em)
    
  
      }
    
    })
  }


  function lista_semanal(filial){
    $.ajax({
      type: 'GET',
      url: '/semanal',
      data:{filial:filial},
      contentType: 'application/json',
      success: function (data) {
    
    
    
    // $('.porcentagem_IM').css('width', data.Porcentagem_IM+'%')
    // $('.porcentagem_IA').css('width', data.Porcentagem_IA+'%')
    // $('.porcentagem_EM').css('width', data.Porcentagem_EM+'%')
    
    // $('.porcentagem_IM').html(data.Porcentagem_IM+'%')
    // $('.porcentagem_IA').html(data.Porcentagem_IA+'%')
    // $('.porcentagem_EM').html(data.Porcentagem_EM+'%')


   if(data.IM < 10){
    data.IM = '0'+data.IM
   }

   if(data.IM_Meta < 10){
    data.IM_Meta = '0'+data.IM_Meta
   }

   if(data.IA < 10){
    data.IA = '0'+data.IA
   }

   if(data.IA_Meta < 10){
    data.IA_Meta = '0'+data.IA_Meta
   }

   if(data.EA < 10){
    data.EA = '0'+data.EA
   }

   if(data.EA_Meta < 10){
    data.EA_Meta = '0'+data.EA_Meta
   }


   if(data.EM < 10){
    data.EM = '0'+data.EM
   }

   if(data.EM_Meta < 10){
    data.EM_Meta = '0'+data.EM_Meta
   }

    
    $('.semanal_im').html(`<span class="numero_cima">${data.IM}</span>
                                   <span class="numero_barra">----</span>
                                  <span class="nr_baixo">${data.IM_Meta}</span>`)

    $('.semanal_ia').html(`<span class="numero_cima">${data.IA}</span>
                                   <span class="numero_barra">----</span>
                                  <span class="nr_baixo">${data.IA_Meta}</span>`)
    
    $('.semanal_ea').html(`<span class="numero_cima">${data.EA}</span>
                                   <span class="numero_barra">----</span>
                                  <span class="nr_baixo">${data.EA_Meta}</span>`)

    $('.semanal_em').html(`<span class="numero_cima">${data.EM}</span>
                                   <span class="numero_barra">----</span>
                                  <span class="nr_baixo">${data.EM_Meta}</span>`)

    
      }
    
    })
  }

  $(document).on('click', '#btn_volta_filiais', function(e){

    window.location.href = "/";
  })


  
  
// EXECUTAR


  menu_dias()

 