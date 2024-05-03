function doGet(e) {
    var output = HtmlService.createTemplateFromFile('form')
        .evaluate()
        .setTitle('CIMcave surveyH1')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    
    return output;
}


// En Code.gs
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}


function doPost(e) {
    if (!e || !e.parameter) {
        Logger.log("No se recibieron datos");
        return HtmlService.createHtmlOutput("No se recibieron datos");
    }
    
    var ss = SpreadsheetApp.openById("1m2yxPvsJ6PVUn0vau0r0xdwSXM4B1DkRt2fatuhaO44");
    var hoja = ss.getSheetByName("surveyH1");
    var datos = [];

    // Campos básicos
    const fields = ['name', 'middle_name', 'surname', 'email', 'organization', 'organization_type', 'position', 'country'];
    fields.forEach(field => datos.push(e.parameter[field] || ""));

    // Campos de encuestas dinámicos
    const numQuestions = 11; // Número de preguntas en el formulario
    for (let i = 1; i <= numQuestions; i++) {
        datos.push(e.parameter[`a${i}_pressure_distance`] || "");
        datos.push(e.parameter[`a${i}_frequency`] || "");
        datos.push(e.parameter[`a${i}_functional_impact`] || "");
        datos.push(e.parameter[`a${i}_resistance`] || "");
        datos.push(e.parameter[`a${i}_recovery_time`] || "");
        datos.push(e.parameter[`a${i}_certainty`] || "");
        datos.push(e.parameter[`a${i}_local_knowledge`] || "");
    }


    hoja.appendRow(datos);
    
    return HtmlService.createHtmlOutput("Form sent successfully!");
}