"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raspi_1 = require("raspi");
const raspi_pwm_1 = require("raspi-pwm");
const pwm = raspi_pwm_1.raspi.PWM;
raspi_1.init(() => {
    //   const led = new pwm('P1-12');
    const servo = new pwm('GPIO17');
    servo.write(70);
    while (1)
        ;
    //   led.write(0.5); // 50% Duty Cycle, half brightness
});
//# sourceMappingURL=servotest2.js.map