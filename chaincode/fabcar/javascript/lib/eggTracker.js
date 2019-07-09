/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class eggTracker extends Contract {

    async initLedger(ctx) {
    }

   

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }
    async packEggs(ctx, Boxnumber, farmer, timestamp, quantity) {
        const eggbox = {
            docType: 'eggbox',
            farmer,
            holder: farmer,
            timestamp: timestamp,
            quantity: quantity,
            status: "packed"
        };

        await ctx.stub.putState(Boxnumber, Buffer.from(JSON.stringify(eggbox)));
    }
    async createShipment(ctx, shipmentNumber, from, to,shipper,timestamp) {
        const shipment = {
            docType: 'shipment',
            from,
            to,
            shipper,
            timestamp: timestamp,
            status: "ready"
        };

        await ctx.stub.putState(shipmentNumber, Buffer.from(JSON.stringify(shipment)));
        //TO-DO get farmer's packed eggboxes, put shipmentNumber as foreign key and set status to "ready for transportcd "
        // let queryString = {};
        // queryString.selector = {};
        // queryString.selector.docType = 'shipment';
        // queryString.selector.farmer = from;
        // let queryResults = await ctx.stub.getState(from);
        // return queryResults; //shim.success(queryResults);
    }
    async reportDamage(ctx, eggboxNumber) {
        const eggbox = await ctx.stub.getState(eggboxNumber); // get the car from chaincode state
        if (!eggbox || eggbox.length === 0) {
            throw new Error(`${eggboxNumber} does not exist`);
        }
        const currentEggbox = JSON.parse(eggbox.toString());
        currentEggbox.status = "damaged";

        await ctx.stub.putState(eggboxNumber, Buffer.from(JSON.stringify(currentEggbox)));
        return "damage reported"
    }
    async loadTruck(ctx, shipmentNumber) {
        const shipment = await ctx.stub.getState(shipmentNumber); // get the car from chaincode state
        if (!shipment || shipment.length === 0) {
            throw new Error(`${shipmentNumber} does not exist`);
        }
        const currentshipment = JSON.parse(shipment.toString());
        currentshipment.status = "loaded";

        await ctx.stub.putState(shipmentNumber, Buffer.from(JSON.stringify(currentshipment)));
       //TO-DO get farmer's packed eggboxes under shipment, put status update "loaded"
        // let queryString = {};
        // queryString.selector = {};
        // queryString.selector.docType = 'shipment';
        // queryString.selector.farmer = from;
        // let queryResults = await ctx.stub.getState(from);
        // return queryResults; //shim.success(queryResults);
       
        return "shipment loaded"
    }

    
}

module.exports = eggTracker;
