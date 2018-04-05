var raspi = require('raspi');
var PWM = require('raspi-pwm');

raspi.init(function() {
    var pwm = new PWM('GPIO17');
    pwm.write(70);
    while(1);
})