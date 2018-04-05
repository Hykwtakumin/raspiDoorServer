const raspi = require('raspi');
const raspiPWM = require('raspi-pwm');
 
raspi.init(() => {
  const servo = new raspiPWM.PWM('GPIO17');
  servo.write(70); // 50% Duty Cycle, aka half brightness
  while(1);
});