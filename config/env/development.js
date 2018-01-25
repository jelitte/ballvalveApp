module.exports = {
    db : 'mongodb://165.133.84.177:27017/mean-user',
    sessionSecret:'developmentSessionSecret',
    thingSpeakServerIP : 'http://165.133.84.177:3000',
    // ThingSpeak Server Channel Number
    // first :  Monitor Sensor, second : Monitor Actuator, third : control
    channelTest : {'monitorSensor': '12',
        'monitorActuator':'13',
        'control':'14'},
    controlKey : '/update?key=6V49NL6PKJ7D5AEI&field1='

};
