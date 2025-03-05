const SPREADSHEET_ID = "1ZIaMVx9P8i0VVFq6WhGjsZodzmkvHg0wGsKBge6jPS8";
const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("data");
// GET API
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

// 獲取所有財產資訊
function getAllAssets() {
    var data = sheet.getDataRange().getValues();
    var assets = [];

    for(var i = 1 ; i < data.length ; i++) {
        assets.push({
            assetId: data[i][0],
            assetName: data[i][1],
            category: data[i][2],
            user: data[i][3],
            location: data[i][4],
            status: data[i][5],
            memo: data[i][6],
            barcode: data[i][7],
            timestamp: data[i][8]
        })
    }

    return ContentService.createTextOutput(JSON.stringify(assets)).setMimeType(ContentService.MimeType.JSON);
}
// 獲取單個財產資訊
function getAssetInfo(assetId) {

  if(!assetId) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: "請提供asset ID"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();

  for(var i = 1 ; i < data.length ; i++) {
    if (data[i][0] === assetId) {
      var assetData = {
            assetId: data[i][0],
            assetName: data[i][1],
            category: data[i][2],
            user: data[i][3],
            location: data[i][4],
            status: data[i][5],
            memo: data[i][6],
            barcode: data[i][7],
            timestamp: data[i][8]
      }
      return ContentService.createTextOutput(JSON.stringify(assetData)).setMimeType(ContentService.MimeType.JSON);
    }
  }


  return ContentService.createTextOutput(JSON.stringify({
    error: true,
    message: "找不到該資產"
  })).setMimeType(ContentService.MimeType.JSON);

}

// POST API
function doPost(e) {
  if(!e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: '請求為空值'
      })).setMimeType(ContentService.MimeType.JSON);
  }

  var requestData;
  try {
    requestData = JSON.parse(e.postData.contents);
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: 'JSON解析錯誤'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if(Object.keys(requestData).length === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: 'JSON為空'
      })).setMimeType(ContentService.MimeType.JSON);
  }

  var method = (requestData.method || "POST").toUpperCase();

  switch(method) {
    case "POST": 
      return addAsset(requestData);
    case "PATCH": 
      return updateAsset(requestData);
    default: {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: '不支援的請求方法'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
}

// 新增資產
function addAsset(data) {

  var assetId = data.assetId;
  var assetName = data.assetName;
  var user = data.user;
  var location = data.location;
  var status = data.status;
  var category = data.category;
  var memo = data.memo;
  var timestamp = new Date();
  var barcode = "";


  var sheetData = sheet.getDataRange().getValues();

  for(var i = 1; i < sheetData.length ; i++) {
    if ( sheetData[i][0] === assetId ) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: '資產編號已存在'
      }))
    }
  }

  if(!assetId) {
    assetId = generateNextAssetId(sheetData);
  }

  sheet.appendRow([assetId, assetName, category, user, location, status, memo, barcode, timestamp]);

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: '資產編號新增成功',
    assetId: assetId
  }))
}
// 尋找當前最大ID並+1
function generateNextAssetId(sheetData) {
  var maxId = 0;

  for(var i = 1; i < sheetData.length ; i++) {
    var currentId = sheetData[i][0].replace("ASSET","");
    var num = parseInt(currentId, 10);
    if(!isNaN(num) && num > maxId ) {
      maxId = num;
    }
  }

  return "ASSET" + String(maxId+1).padStart(4, "0");
}


// 待完成 更新資產訊息
function updateAsset(e) {
  return ContentService.createTextOutput('UPDATE').setMimeType(ContentService.MimeType.JSON);

}





