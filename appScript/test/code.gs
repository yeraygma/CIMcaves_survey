function doGet(e) {
  return HtmlService.createTemplateFromFile('form')
    .evaluate()
    .setTitle('CIMcave surveytest') 
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
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

    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("surveytest");
    var datos = [];
    
    datos.push(e.parameter.name || "");
    datos.push(e.parameter.middle_name || "");
    datos.push(e.parameter.surname || "");
    datos.push(e.parameter.email || "");
    datos.push(e.parameter.organization || "");
    datos.push(e.parameter.position || "");
    datos.push(e.parameter.country || "");
    datos.push(e.parameter.organization_type || "");
    datos.push(e.parameter.pressure_distance || "");
    
    hoja.appendRow(datos);
    
    return HtmlService.createHtmlOutput("¡Formulario enviado con éxito!");
}