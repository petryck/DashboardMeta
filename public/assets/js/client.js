import { io } from "socket.io-client";
var lista_espera_processos = [];
var channel = io();


channel.on('novoProcesso', (e) => {
    console.log('novo processo')

    // lista_espera_processos.push(e);


  })

setInterval(() => {

    location.reload(true)
  }, 7200000);

var metricas_automaticas = false;

setInterval(() => {

   if(metricas_automaticas == true){

    if($('.metricas_semanal').css('display') == 'none'){
        $('.metricas_semanal').css('display', 'block')
        $('.metricas_mensal').css('display', 'none')
      }else{
        $('.metricas_semanal').css('display', 'none')
        $('.metricas_mensal').css('display', 'block')
      }
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
            msg: "Métricas automaticas ativida a cada 30 segundos.",
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
      img_modal = 'shipIcon';
    }else if(element.Modalidade_Processo == 3){
      img_modal = 'shipIcon';
    }

          var corpo = `<div class="card-body" style="padding-bottom: 23px;padding-top: 7px;">
          <div class="row">
             <div class="col-xl-1 col-lg-1 feature">

              
                <div class="fa-lg  border mb-3" style="display: block;background-image: url(${element.Foto_Vendedor});background-size: cover;width: 79px;height: 79px;"> </div>
                <div class=" fa-lg  border  mb-3" style="display: block;background-image: url(${element.Foto_InsideSales});background-size: cover;width: 79px;height: 79px;"> </div>
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


  function lista_mensal(){
    $.ajax({
      type: 'GET',
      url: '/mensal',
      contentType: 'application/json',
      success: function (data) {
  var mes_nomes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
   
  
  
  $('.corpo_grafico_impo_aerea').html('')
  $('.corpo_grafico_impo_maritima').html('')
  $('.corpo_grafico_expo_aerea').html('')
  $('.corpo_grafico_expo_maritima').html('')
  data.forEach(element => {
  
//     var corpo_grafico = '<div class="row row_new">'
//   corpo_grafico += '<div class="col-3 colunaIA">'
//   corpo_grafico += '<div class="MesPai">'
//   corpo_grafico += '<div class="fundoCinza"></div>'
//   corpo_grafico += '<span class="MesAno">'+mes_nomes[element.Mes_Abertura - 1]+'</span>'
//   corpo_grafico += '<div class="progress">'
//   corpo_grafico += '<div class="progress-bar esquerda" role="progressbar" style="width: '+((element.IA*100)/element.IA_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_IA+'%</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<span class="MetaEscrito">'+element.IA+'/'+element.IA_Meta+'</span>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<div class="col-3 colunaIM">'
//   corpo_grafico += '<div class="MesPai">'
//   corpo_grafico += '<div class="progress">'
//   corpo_grafico += '<div class="progress-bar esquerda" role="progressbar" style="width: '+((element.IM*100)/element.IM_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_IM+'%</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<span class="MetaEscrito">'+element.IM+'/'+element.IM_Meta+'</span>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<div class="col-3 colunaEA">'
//   corpo_grafico += '<div class="MesPai">'
//   corpo_grafico += '<div class="progress">'
//   corpo_grafico += '<div class="progress-bar direita" role="progressbar" style="width: '+((element.EA*100)/element.EA_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_EA+'%</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<span class="MetaEscrito">'+element.EA+'/'+element.EA_Meta+'</span>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<div class="col-3 colunaEM">'
//   corpo_grafico += '<div class="MesPai">'
//   corpo_grafico += '<div class="progress">'
//   corpo_grafico += '<div class="progress-bar direita" role="progressbar" style="width: '+((element.EM*100)/element.EM_Meta)+'%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">'+element.Porcentagem_EM+'%</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '<span class="MetaEscrito">'+element.EM+'/'+element.EM_Meta+'</span>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '</div>'
//   corpo_grafico += '</div>'

  



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


// EXECUTAR
  lista_mensal()
  lista_novos_processos()
  menu_dias()

