const SPREADSHEET_ID = "1ZIaMVx9P8i0VVFq6WhGjsZodzmkvHg0wGsKBge6jPS8";
const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("data");

function doGet(e) {
    var action = e.parameter.action;

    switch(action) {
        case "getAllAssets" : {
            return getAllAssets();
        }
        case "getAssetInfo" : {
           return getAssetInfo(e.parameter.assetId); 
        }
        default: {
            return ContentService.createTextOutput("無效的動作，Invalid Action!").setMimeType(ContentService.MimeType.TEXT);
        }
    }

}

function getAllAssets() {
    var data = sheet.getDataRange().getValues();
    var assets = [];

    for(var i = 1 ; i < data.length ; i++) {
        assets.push({
            assetId: data[i][0],
            assetName: data[i][1],
            user: data[i][2],
            location: data[i][3],
            status: data[i][4],
            category: data[i][7]
        })
    }

    return ContentService.createTextOutput(JSON.stringify(assets).setMimeType(ContentService.MimeType.JSON));
}