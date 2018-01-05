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
			
			$scope.pressureText = tmpData.data_M_Pressure1;
			$scope.gasText = tmpData.data_M_gas;
			$scope.temparText = tmpData.data_M_Temp;
			
			
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
		
		 $scope.sendControl = function() {
        	// Create a new message object
            var message = {
                text: this.ControlText,
            };
            
			console.log("Send Control")
            // Emit a 'chatMessage' message event
            Socket.emit('ControlMessage', message);
            
            // Clear the message text
            this.ControlText = "";
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
		 
		 

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');
        })

    }
]); 
