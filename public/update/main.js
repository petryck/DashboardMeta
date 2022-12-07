function ListaFinalizados(e) {
  $.ajax({
    type: "GET",
    url: "/ListaAuditado",
    success: function (data) {
      data.forEach((element) => {
        $("#ItensAuditados").append(
          `<p>${element.Data_Auditado} - ${element.Qtd_Processo} row(s)</p>`
        );
      });
    },
  });

  $.ajax({
    type: "GET",
    url: "/ListaFechamento",
    success: function (data) {
      data.forEach((element) => {
        $("#ItensFinalizados").append(
          `<p>${element.Data_Fechamento_Processo} - ${element.Qtd_Processo} row(s)</p>`
        );
      });
    },
  });
}

ListaFinalizados();