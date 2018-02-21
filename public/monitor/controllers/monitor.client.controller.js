

angular.module('monitor').controller('MonitorController', ['$scope', 'Socket',
    function($scope, Socket) {
    	// Create a messages array
        $scope.messages = [];
        $scope.pressureTextTmp = "0"
		$scope.gasTextTmp = "0"
		$scope.temparTextTmp = "0"
        // Add an event listener to the 'chatMessage' event
        Socket.on('chatMessage', function(message) {
            $scope.messages.push(message);
        });

        // Create a controller method for sending messages
        $scope.sendMessage = function() {
        	// Create a new message object
            var message = {
                text: this.messageText,
            };

            // Emit a 'chatMessage' message event
            Socket.emit('chatMessage', message);

            // Clear the message text
            this.messageText = '';
			console.log('sendMessage');
        }

		Socket.on('tmpMessage', function(message) {
            //$scope.monitorText = message.text;
			$scope.monitorText = message.text;
			console.log(message.text)
			console.log("Recieved Monitor data")
        });

		Socket.on('monitorMessage', function(message) {
            //$scope.monitorText = message.text;

			var tmpText = message.text;
			//var tmpObj = JSON.stringify(tmpText);
			var tmpData = JSON.parse(tmpText);

			$scope.pressureText = tmpData.data_M_pressure;
			$scope.gasText = tmpData.data_M_gas;
			$scope.flangeTemperText = tmpData.data_M_flangeTemper;
            $scope.flangePressureText = tmpData.data_M_flangePressure;
            $scope.flangeFlowText = tmpData.data_M_flangeFlow;
            $scope.data_alert = tmpData.data_alert;
            $scope.valveInfo =  tmpData.valveInfo;


			if(tmpData.data_M_actu_remote == 1){
                $scope.toggleRemote = true
            }else{
                $scope.toggleRemote = false
            }

            if(tmpData.data_M_actu_fault == 1){
                $scope.toggleFault = true
            }else{
                $scope.toggleFault = false
            }

            if(tmpData.data_M_actu_open == 1){
                $scope.toggleOpen = true
            }else{
                $scope.toggleOpen = false
            }

            if(tmpData.data_M_actu_close == 1){
                $scope.toggleClose = true
            }else{
                $scope.toggleClose = false
            }

            if(tmpData.data_alert == 1){
                $scope.toggleAlert = true
            }else{
                $scope.toggleAlert = false
            }




			//console.log("Recieved Monitor data")
        });



        $scope.sendMonitor = function() {
        	// Create a new message object
            var message = {
                //text: "",
            };

			console.log("Send Monitor")
            // Emit a 'chatMessage' message event
            Socket.emit('tmpMessage', message);

            // Clear the message text
            //this.monitorText = "";
        }

		 $scope.sendControl = function(data) {
        	// Create a new message object
            var message = {
                text: data
            };

			console.log("Send Control :"+ data);
            // Emit a 'chatMessage' message event
            Socket.emit('ControlMessage', message)
        }

		 $scope.sendMonitorPressure = function() {
        	// Create a new message object
            var message = {
                text: this.pressureTextTmp,
				status : 'pressure'
            };

			console.log("Send Control")
            // Emit a 'chatMessage' message event
            Socket.emit('ControlMessage', message);

            // Clear the message text
            this.pressureTextTmp = "0";
        }

		 $scope.sendMonitorGas = function() {
        	// Create a new message object
            var message = {
                text: this.gasTextTmp,
				status : 'gas'
            };

			console.log("Send Control")
            // Emit a 'chatMessage' message event
            Socket.emit('ControlMessage', message);

            // Clear the message text
            this.gasTextTmp = "0";
        }


		 $scope.sendMonitorTempar = function() {
        	// Create a new message object
            var message = {
                text: this.temparTextTmp,
				status : 'tempar'
            };

			console.log("Send Control")
            // Emit a 'chatMessage' message event
            Socket.emit('ControlMessage', message);

            // Clear the message text
            this.temparTextTmp = "0";
        }


        $scope.clearChannel = function() {

            var message = {
                text: 'tmp'
            };


            // Emit a 'chatMessage' message event
            Socket.emit('ClearChannel', message);
            console.log("clear channel");



        }





        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');
        })


        $scope.toggle = false;

         $scope.activeButton = function() {
            $scope.toggle = !$scope.toggle;
             console.log($scope.toggle);
          }

        $scope.singleModel = 1;
        //$scope.valveInfo =  socket.request.user.username;











    }
]);
