'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

module.exports = {
    packEggs : async function packEggs(request) {
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
            
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(request.user);
            if (!userExists) {
                console.log('An identity for the user '+request.user+' does not exist in the wallet');
                return;
            }
            
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: request.user, discovery: { enabled: false } });
            
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
            
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
            
            // Submit the specified transaction.
            await contract.submitTransaction('packEggs', this.makeid(3, 'eggbox'), request.user, Date.now().toString(), request.quantity);
            console.log('Transaction has been submitted');
            
            // Disconnect from the gateway.
            await gateway.disconnect();
            
        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            process.exit(1);
        }
    },
    createShipment : async function createShipment(request) {
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
            
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(request.user);
            if (!userExists) {
                console.log('An identity for the user '+request.user+' does not exist in the wallet');
                return;
            }
            
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: request.user, discovery: { enabled: false } });
            
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
            
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
            
            // Submit the specified 
            const result = await contract.submitTransaction('createShipment',this.makeid(3, 'shipment'), request.from, request.to, request.shipper, Date.now().toString());
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            
            // Disconnect from the gateway.
            await gateway.disconnect();
            
        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            process.exit(1);
        }
    },
    reportDamage : async function reportDamage(request) {
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
            
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(request.user);
            if (!userExists) {
                console.log('An identity for the user '+request.user+' does not exist in the wallet');
                return;
            }
            
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: request.user, discovery: { enabled: false } });
            
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
            
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
            
            // Submit the specified 
            const result = await contract.submitTransaction('reportDamage', request.eggbox);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            
            // Disconnect from the gateway.
            await gateway.disconnect();
            
        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            process.exit(1);
        }
    },
    loadTruck : async function loadTruck(request) {
            try {
                // Create a new file system based wallet for managing identities.
                const walletPath = path.join(process.cwd(), 'wallet');
                const wallet = new FileSystemWallet(walletPath);
                console.log(`Wallet path: ${walletPath}`);
                
                // Check to see if we've already enrolled the user.
                const userExists = await wallet.exists(request.user);
                if (!userExists) {
                    console.log('An identity for the user '+request.user+' does not exist in the wallet');
                    return;
                }
                
                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(ccp, { wallet, identity: request.user, discovery: { enabled: false } });
                
                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork('mychannel');
                
                // Get the contract from the network.
                const contract = network.getContract('fabcar');
                
                // Submit the specified 
                const result = await contract.submitTransaction('loadTruck', request.shipment);
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                
                // Disconnect from the gateway.
                await gateway.disconnect();
                
            } catch (error) {
                console.error(`Failed to submit transaction: ${error}`);
                process.exit(1);
            }
        },
    makeid : function makeid(length, type) {
        var result           = type+'_';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy';
        var numbers       = '0123456789';
        var charactersLength = characters.length;
        var numbersLength = numbers.length;
        
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
        return result;
    }
    
}