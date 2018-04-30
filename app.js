'use strict';

const Homey = require('homey');


class MyApp extends Homey.App {


    
    




	
    onInit() {


        this.app = 'X10'
		
        this.log('MyApp is running...');

        this.signalX10 = require('./lib/homeySignal/signalx10.js');

        this.X10DeviceArray =
            [
                [1, 'MS13E'],
                [2, 'OnOff'],
                [3, 'Dim'],
                [4, 'All'] // for command all of or on
            ]

        this.X10DeviceMap = new Map(this.X10DeviceArray)

        this.virtualDeviceClassArray =
            [
                [1, 'none'],
                [2, 'light'],
                [3, 'kettle'],
                [4, 'amplifier'],
                [5, 'heater'],
                [6, 'fan'],// for command all of or on
                [7, 'speaker']
            ]


        this.virtualDeviceClassMap = new Map(this.virtualDeviceClassArray)



        this.rfxcomDeviceTypes = {
            "generic":  // as template
                {
                    data: {
                        //{ type: null, index: null }, dfor more devicetypes per driver visonic motion sensor or doorsensor 
                        id: null,             // homey id 
                        houseCode: null,
                        unitCode: null,
                        protocol: null,
                        type: null,
                    },

                    driver: null,

                    name: null,            //   rfxcom and old id 
                    rx: [], // { type: null, index: null } of rxtx where signals are received from for this device  the device id of a rxtx is its ip
                    tx: [], // { type: null, index: null } of rxtx where franes are send to for this device               
                    capabilities: [],
                    capability: {},
                    icon: null,
                    settings: null
                },

         
            "MS13E":
                {
                    data: {
                        id: null,             // homey id 
                        houseCode: null,
                        unitCode: null,
                        protocol: 'X10', //  visonic , x10 , oregon , etc klika elro etc ndlers 
                        type: "MS13E"
                    },
                    driver: `X10`,
                    name: null,    // type of device eg visonicdoorsensor
                    rx: [], //  //{ type: null, index: null }of rxtx where signals are received from for this device
                    tx: [], // { type: null, index: null } of rxtx where franes are send to for this device               
                    capabilities: ["alarm_motion", "alarm_night"],
                    capability: {
                        alarm_motion: false,
                        alarm_night: false
                    },   // onoff dim temp etc as json  object of capabilities
                    icon: null,
                    settings: null
                },

            "OnOff":
                {
                    data: {
                        id: null,             // homey id 
                        houseCode: null,
                        unitCode: null,
                        protocol: 'X10', //  visonic , x10 , oregon , etc klika elro etc ndlers 
                        type: "OnOff",           // type of device eg visonicdoorsensor
                    },

                    driver: "X10",
                    name: null,
                    rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
                    tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
                    capabilities: ['onoff'],
                    capability: { onoff: false }   // onoff dim temp etc as json  object of capabilities
                    , icon: null,
                    settings: null
                },

            "Dim":
                {
                    data: {
                        id: null,             // homey id 
                        houseCode: null,
                        unitCode: null,
                        protocol: 'X10', //  visonic , x10 , oregon , etc klika elro etc ndlers 
                        type: "Dim",      // type of device eg visonicdoorsensor 
                    },
                    driver: "X10",
                    name: null,
                    rx: [], // { type: null, index: null } of rxtx where signals are received from for this device
                    tx: [], // { type: null, index: null } of rxtx where franes are send to for this device 
                    capabilities: ['onoff', 'dim'],
                    capability: {
                        onoff: false,
                        dim: 0
                    },                // onoff dim temp etc as json  object of capabilities
                    icon: null,
                    settings: null
                }





        }


        





        //let mySignal = new Homey.Signal( 'X10', '433');
        //mySignal.register()

        //    .then(() => {

        //        // on a payload event
        //        mySignal.on('payload',  (payload, first) => {
        //            this.log('received from a device:', payload, 'isRepetition:', !first);
        //        });

        //        // on a command event
        //        //mySignal.on('cmd', function (cmdId, first) {
        //        //    console.log('received a command from a device:', cmdId, 'isRepetition:', !first);
        //        //});

        //        // transmit the bits 01011001
        //      //  mySignal.tx([0, 1, 0, 1, 1, 0, 0, 1], this.log);

        //        // transmit predefined command
        //        //mySignal.cmd('ONOFF', this.log);

        //        // unregister the signal
        //      //  mySignal.unregister(this.log);

        //    })
        //    .catch(this.error)


        this.receivedX10Trigger = new Homey.FlowCardTrigger('Received_X10_command');
        this.receivedX10Trigger
            .registerRunListener((args, state) => {

                console.log(args); // { 'location': 'New York' }, this is the user input
                console.log(state); // { 'location': 'Amsterdam' }, this is the state parameter, as passed in trigger()

                // If true, this flow should run
                return Promise.resolve(args.houseCode === state.houseCode && args.unitCode === state.unitCode &&
                    args.command === state.command);

            })
            .register()

        this.triggerflow2 = (result) => {

            let tokens = {}

            if (result.command == true) { result.command = 'on' }  // 'on'  'off'
            else if (result.command == false) { result.command = 'off' }

            let state = {
                'houseCode': result.houseCode,
                'unitCode': result.unitCode,
                'command': result.command
            }

            this.receivedX10Trigger.trigger(tokens, state)
                .then(this.log)
                .catch(this.error)

        }








		
    }// onint

  












	
}

module.exports = MyApp;