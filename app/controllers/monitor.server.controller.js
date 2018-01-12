var monitor = require('../controllers/monitor.server.function');
var config = config = require('../../config/config');

// Create the monitor configuration
module.exports = function(io, socket) {
	// Emit the status event when a new socket client is connected
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
        
        
    });
    console.log('Socket Client connected');

    // Send a chat messages to all connected sockets when a message is received 
    socket.on('chatMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        // Emit the 'chatMessage' event
        io.emit('chatMessage', message);
    });
	
	
	 var monitorValue = setInterval(function(){
          //console.log('Timeout');
		 
		 // Create a new message object
            var message = {
                text: this.messageText,
            };
            
        //monitor Value Send
		message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;
		 
        //var Url_M_Pressure1 = "http://165.133.84.177:3000/channels/1/feeds/last"
        //data_M_Pressure1 = monitor.getMonitorData(Url_M_Pressure1);
        var Url_M_Gas = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 2);
        var Url_M_Pressure = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 3);
        var Url_M_Temp = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 4);
        var Url_M_Actu_Remote = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 5);
        var Url_M_Actu_Fault = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 6);
        var Url_M_Actu_Close = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 7);
        var Url_M_Actu_Open = monitor.makeUrlofGetLast(config.thingSpeakServerIP, 8);

        data_M_gas = monitor.getMonitorData(Url_M_Gas);
        data_M_Pressure = monitor.getMonitorData(Url_M_Pressure);
        data_M_Temp = monitor.getMonitorData(Url_M_Temp);
        data_M_Actu_Remote = monitor.getMonitorData(Url_M_Actu_Remote);
        data_M_Actu_Fault = monitor.getMonitorData(Url_M_Actu_Fault);
        data_M_Actu_Close = monitor.getMonitorData(Url_M_Actu_Close);
        data_M_Actu_Open = monitor.getMonitorData(Url_M_Actu_Open);
        
        //var dataSet = {"Url_M_ActuOpen": data_M_ActuOpen , "Url_M_ActuClose ": data_M_ActuClose }
		var dataSet = {"data_M_Pressure1" : data_M_Pressure1,
                       "data_M_gas": data_M_gas,
                       "data_M_Temp":data_M_Temp,
                       "data_M_Actu_Remote":data_M_Actu_Remote,
                       "data_M_Actu_Fault":data_M_Actu_Fault,
                       "data_M_Actu_Close":data_M_Actu_Clsoe,
                       "data_M_Actu_Open":data_M_Actu_Open,

                      };
        
        var dataSetText= JSON.stringify(dataSet);
        //console.log(dataSetText);
        message.text = dataSetText;
        

        // Emit the 'chatMessage' event
        //io.emit('monitorMessage', message);
		socket.emit('monitorMessage', message);
    },1000);
	
	
	
	
    
     // Send a MonitorData to all connected sockets when a message is received 
    socket.on('tmpMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;
        
         //var Url_Gas = "http://192.168.1.41:3000/channels/9/feeds/last"
        var Url_M_ActuOpen = "http://165.133.84.177:3000/channels/3/feeds/last"
        data_M_ActuOpen = monitor.getMonitorData(Url_M_ActuOpen);


        
        var Url_M_ActuClose = "http://165.133.84.177:3000/channels/4/feeds/last"
        data_M_ActuClose = monitor.getMonitorData(Url_M_ActuClose);
        
        var Url_C_ActuOpen = "http://165.133.84.177:3000/channels/5/feeds/last"
        data_C_ActuOpen = monitor.getMonitorData(Url_C_ActuOpen);
        
        var Url_C_ActuClose = "http://165.133.84.177:3000/channels/6/feeds/last"
        data_C_ActuClose = monitor.getMonitorData(Url_C_ActuClose);
        
        var Url_M_Pressure1 = "http://165.133.84.177:3000/channels/7/feeds/last"
        data_M_Pressure1 = monitor.getMonitorData(Url_M_Pressure1);
        
        var Url_M_Temp = "http://165.133.84.177:3000/channels/8/feeds/last"
        data_M_Temp = monitor.getMonitorData(Url_M_Temp);
        
        var Url_M_Gas = "http://165.133.84.177:3000/channels/9/feeds/last"
        data_M_gas = monitor.getMonitorData(Url_M_Gas);
        
        //var dataSet = {"Url_M_ActuOpen": data_M_ActuOpen , "Url_M_ActuClose ": data_M_ActuClose }
		var dataSet = {"data_C_ActuOpen" : data_C_ActuOpen};
        
        var dataSetText= JSON.stringify(dataSet);
        
        //console.log(dataSetText);
        
        message.text = dataSetText;
        

        // Emit the 'chatMessage' event
        //io.emit('monitorMessage', message);
		socket.emit('tmpMessage', message);
    });
	
	
	
	
	socket.on('ControlMessage',function(message){
		
		if(message.status == 'pressure'){
			var url = "http://165.133.84.177:3000/update?key=3Z6HP8IG2L1UVJ5R&field1=" + message.text;
			console.log(url);
		
			monitor.setControlData(url);
			
		}
		
		
		if(message.status == 'gas'){
			var url = "http://165.133.84.177:3000/update?key=MCDBYNPP9KJQ88G4&field1=" + message.text;
			console.log(url);
		
			monitor.setControlData(url);
			
		}
		
		if(message.status == 'tempar'){
			var url = "http://165.133.84.177:3000/update?key=M750998VWC7VCJVP&field1=" + message.text;
			console.log(url);
		
			monitor.setControlData(url);
			
		}
		/*
		var url = "http://192.168.1.41:3000/update?key=9PLD83Z2F5HKSXZL&field1=" + message.text;
		console.log(url);
		
		monitor.setControlData(url);*/
		
		 
		
	});
    

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function() {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
    
    
    
};
