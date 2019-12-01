function main(){
    Send("��}���s�{��");
    Send("�����");
    Send("JR���s��");
    Send("JR�ޗǐ�");
}

var LINE_TOKEN = "OI7CIpGQHMXrsjKLy4jQBH4EKhnkYsqtKMZuSs6b8uj";

function Send(lineName){
    var message = getDelayInfo(lineName);
    
    if(message !== "null"){
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

function getDelayInfo(lineName){
    var message = "null";
    var json = JSON.parse(
        UrlFetchApp.fetch(
            "https://tetsudo.rti-giken.jp/free/delay.json"
        ).getContentText()
    );

    for(var i = 0; i < json.length; i++){
        if(json[i]["name"] === lineName){
            message = lineName+"�ɉ^�s��񂪂���܂��B";
        }
    }
    return message;
}