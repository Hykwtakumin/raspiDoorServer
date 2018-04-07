/**
 * Created by hykwtakumin on 2018/04/07.
 */
'use strict';

var five = require('johnny-five')
var board = require('pi-io')
var _ = require('lodash');
var linda = require('linda')

var board = new five.Board({
    io : new PiIO()
});

board.on('ready', function () {
    var servo = new five.Servo({
        pin : 'GPIO18',
        type: 'standard'
    });

    var config = linda.config;
    var tuple = linda.tuplespace(config.linda.space);

    linda.io.on('connect', function(){

        linda.debug(`watching {type: 'door', where: '${config.where}'} in tuplespace '${ts.name}'`);
        linda.debug(`=> ${config.linda.url}/${ts.name}?type=door&where=${config.where}&cmd=open`);

        return ts.watch({
            type: 'door',
            where: config.where,
            cmd: 'open'
        }, function(err, tuple) {
            var where;
            if (tuple.data.response != null) {
                return;
            }
            where = tuple.data.where;
            if (err) {
                linda.debug(err);
                return;
            }
            linda.debug(tuple);
            return door_open_throttled(function() {
                var res;
                res = tuple.data;
                res.response = 'success';
                return ts.write(res);
            });
        });
    });

    // var door_open = function(onComplete = function() {}) {
    //     //ここをPi-IOのServoに切り替えればOK
    //     arduino.servoWrite(9, 0);
    //     return setTimeout(function() {
    //         arduino.servoWrite(9, 180);
    //         return onComplete();
    //     }, 2000);
    // };

    function doorOpen() {
        console.log("sweeping...");
        servo.sweep({
            'range'    : [0, 90],
            'interval' : 1000
        });
        servo.stop();
    }
    var door_open_throttled;
    return door_open_throttled = _.throttle(doorOpen, 5000, {
        trailing: false
    });


});
