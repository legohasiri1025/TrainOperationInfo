function main(){
    Logger.log("test");
    Send("京都本線", "阪急電鉄");
    Send("京阪本線", "京阪電車");
    Send("JR京都線", "JR西日本");
    Send("JR奈良線", "JR西日本");
}

var LINE_TOKEN = "OI7CIpGQHMXrsjKLy4jQBH4EKhnkYsqtKMZuSs6b8uj";

function Send(lineName, Company){
    var message = getDelayInfo(lineName, Company);
    
    if(message != "null"){
        sendLinePost(message);
    }
}

function sendLinePost(message){
    var token = LINE_TOKEN;
    var options = {
        method: "post",
        payload: "message=" + message,
        headers:{
            Authorization: "Bearer " + token
        }
    };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

function getDelayInfo(lineName, company){
    var message = "null";
    var json = JSON.parse(
        UrlFetchApp.fetch(
            "https://tetsudo.rti-giken.jp/free/delay.json"
        ).getContentText()
    );

    for(var i = 0; i < json.length; i++){
      Logger.log(json[i]["name"]);
        if(json[i]["name"] == lineName && json[i]["company"] == company){
            message = company + lineName + "に運行情報があります。";
        }
    }
    return message;
}