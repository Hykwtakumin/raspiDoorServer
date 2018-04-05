var raspi = require('raspi');
var PWM = require('raspi-pwm').PWM;

raspi.init(function() {
    var pwm = new PWM('GPIO17');
    pwm.write(70);
    while(1);
})