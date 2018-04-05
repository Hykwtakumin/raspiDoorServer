import { init } from 'raspi';
import { raspi } from 'raspi-pwm';

const pwm = raspi.PWM
 
init(() => {
//   const led = new pwm('P1-12');
  const servo = new pwm('GPIO17')
  servo.write(70)
  while(1)
//   led.write(0.5); // 50% Duty Cycle, half brightness
});