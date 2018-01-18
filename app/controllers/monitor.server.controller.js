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

         //console.log(config.channelTest.monitorActuator)
         //var tmpUrl = monitor.makeUrlofGetLast(config.thingSpeakServerIP, config.channelTest.monitorSensor);
         //var tmp = monitor.getMonitorData(tmpUrl);
         //console.log(tmp.field2);



        var Url_M_sensor = monitor.makeUrlofGetLast(config.thingSpeakServerIP, config.channelTest.monitorSensor);
        var Url_M_actu = monitor.makeUrlofGetLast(config.thingSpeakServerIP, config.channelTest.monitorActuator);


        var data_M_sensor = monitor.getMonitorData(Url_M_sensor);
        var data_M_actu = monitor.getMonitorData(Url_M_actu);

        var data_M_gas = data_M_sensor.field1;
        var data_M_pressure = data_M_sensor.field2;
        var data_M_flangeFlow = data_M_sensor.field3;
        var data_M_flangeTemper = data_M_sensor.field4;
        var data_M_flangePressure = data_M_sensor.field5;

        var data_M_actu_remote = data_M_actu.field1;
        var data_M_actu_fault = data_M_actu.field2;
        var data_M_actu_open = data_M_actu.field3;
        var data_M_actu_close = data_M_actu.field4;




        //var dataSet = {"Url_M_ActuOpen": data_M_ActuOpen , "Url_M_ActuClose ": data_M_ActuClose }
		var dataSet = {
		    "data_M_pressure" : data_M_pressure,
            "data_M_gas": data_M_gas,

            "data_M_flangeFlow":data_M_flangeFlow,
            "data_M_flangeTemper":data_M_flangeTemper,
            "data_M_flangePressure":data_M_flangePressure,

            "data_M_actu_remote":data_M_actu_remote,
            "data_M_actu_fault":data_M_actu_fault,
            "data_M_actu_open":data_M_actu_open,
            "data_M_actu_close":data_M_actu_close,
            };

        var dataSetText= JSON.stringify(dataSet);
        //console.log(dataSetText);
        message.text = dataSetText;


        // Emit the 'chatMessage' event
        //io.emit('monitorMessage', message);
		socket.emit('monitorMessage', message);
    },1500);





     // Send a MonitorData to all connected sockets when a message is received
    socket.on('tmpMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;


        console.log(config.channelTest.monitorActuator)
        var tmpUrl = monitor.makeUrlofGetLast(config.thingSpeakServerIP, config.channelTest.monitorSensor);
        var tmp = monitor.getMonitorData(tmpUrl);
        console.log(tmp.field2);
        console.log(socket.request.user.email);



        //message.text = dataSetText;



        //io.emit('monitorMessage', message);
		//socket.emit('tmpMessage', message);
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
        clearInterval(monitorValue)

    });



};
