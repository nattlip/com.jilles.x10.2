'use strict';

const Homey = require('homey');



class MyApp extends Homey.App {
	
	onInit() {
		
        this.log('MyApp is running...');


        let mySignal = new Homey.Signal( 'X10', '433');
        mySignal.register()

            .then(() => {

                // on a payload event
                mySignal.on('payload',  (payload, first) => {
                    this.log('received from a device:', payload, 'isRepetition:', !first);
                });

                // on a command event
                //mySignal.on('cmd', function (cmdId, first) {
                //    console.log('received a command from a device:', cmdId, 'isRepetition:', !first);
                //});

                // transmit the bits 01011001
              //  mySignal.tx([0, 1, 0, 1, 1, 0, 0, 1], this.log);

                // transmit predefined command
                //mySignal.cmd('ONOFF', this.log);

                // unregister the signal
              //  mySignal.unregister(this.log);

            })
            .catch(this.error)











		
    }

  












	
}

module.exports = MyApp;