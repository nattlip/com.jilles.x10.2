'use strict';

const Homey = require('homey');
const masterDriver = require('../lib/masterdriver/masterdriver.js')

const helpFunctions = require('../lib/helpFunctions.js').jan;

const util = require('util');
const Fdevice = require('../lib/filledDevice.js')

class appDriver extends Homey.Driver {//extends masterDriver {

    onInit() {

        this.devices = this.getDevices()
        this.log(`devices from getdevices  ${this.devices} `)
        this.log(`devices length  ${this.devices.length} `);
     //   this.log(`Homey  ${util.inspect(Homey.ManagerDrivers.getDriver('app'))} `);


        
      
            
            



        }



    

    onPair(socket) {

        this.devices = this.getDevices()

            if (this.devices.length == 0) {
                this.log(`pair appDevice entered    `)

                //   this.log(`socket  ${util.inspect(socket.emit, { showHidden: true, depth: null })} `);

                this.send = { 'sendhtml': 'yes' }


                socket.emit('pair', this.send);








                //TODO  is compute device necessary , in presenting dat from recievers a device is created, pairing mkes alreadx a device



            }

        }






       



   


   


}

module.exports = appDriver;