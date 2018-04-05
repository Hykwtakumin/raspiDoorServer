var raspi = require('raspi');
var raspiPwm = require('raspi-pwm');

raspi.init(function() {
    var pwm = new raspiPwm.PWM('GPIO17');
    pwm.write(70);
    while(1);
})