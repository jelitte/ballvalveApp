var request = require("request");

var http = require('http');
exports.getMonitorData = function(dataUrl){
            //var url = "http://192.168.1.41:3000/channels/9/feeds/last"

            var sync_request = require('sync-request');

            
            var res = sync_request('GET', dataUrl);
            var tmpObj = res.getBody('utf8');
            //var tmpObj = JSON.stringify(res.getBody('utf8'))
            var fieldObj = JSON.parse(tmpObj); 
            //var resultData = fieldObj.field1;
            var resultData = fieldObj;
            //console.log(resultData);

           return resultData;
    
    
};
exports.setControlData = function(dataUrl){
            //var url = "http://192.168.1.41:3000/channels/9/feeds/last"

            //var sync_request = require('sync-request');

            
		   request({
					url: dataUrl,
					json: true
				},function(error,response, body){
					if(!error &&response.statusCode == 200){

					}
			})
    
};

exports.makeUrlofGetLast = function(serverIP,channelNum){
    //var Url_M_ActuOpen = "http://127.0.0.1:3000/channels/3/feeds/last"
    var result = serverIP + '/channels/' + channelNum + '/feeds/last'
    //console.log(result);
    return result;

};
exports.makeUrlofSendControl = function(serverIP,key,data){
    //var Url_M_ActuOpen = "http://127.0.0.1:3000/channels/3/feeds/last"

    var result = serverIP +'/update?key=' + key+ '&field1=' + data;
    //console.log(result);
    return result;

};


exports.clearChannel = function(url){
    console.log('clear channel')
    var url1 = 'http://165.133.84.177:3000/channels/15/feeds.json?api_key=XBG3P4QQWH74YD8F';
    //var url1 = 'https://165.133.84.177:3000/channels/15/feeds.json';
    var options ={
        url: url1,
        method: "DELETE",
        json:true,
    };


    var tmp = request(options,function (error,response,body) {
        if(!error && response.statusCode == 200){

            console.log(body)

        }else{
            console.log("failed")
        }

    });


}
//경보신호 체크 함수
exports.makeAlertSignal = function(dataSet){
    var result = 0;
    //console.log(dataSet.data_M_pressure);
    if(dataSet.data_M_pressure > 10)
        result=1;
    return result;
}
            
        /*
     
        var tmp = request({
            url: url,
            json: true
        },function(error,response, body){
            if(!error &&response.statusCode == 200){

                //console.log(body)
                var tmpObj = JSON.stringify(body)
                var fieldObj = JSON.parse(tmpObj);
                //console.log(fieldObj.channel.id)
                //console.log(fieldObj.feeds[2].field1)
                
                
                
                var resultData = fieldObj.field1;
                console.log(resultData);               
                
                res.send(resultData);
            }
        });
    
    
   
    //return resultData;
   //console.log(resultData); */
