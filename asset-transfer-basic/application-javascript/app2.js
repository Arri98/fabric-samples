'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

let contract;

async function main() {
	try {
		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();
		console.log("Created gateway");
		await gateway.connect(ccp, {
			wallet,
			identity: org1UserId,
			discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
		});

		const network = await gateway.getNetwork(channelName);

		// Get the contract from the network.
		contract = network.getContract(chaincodeName);
		console.log("got contract");

	}catch (e) {
		console.error(`******** FAILED to run the application: ${e}`);
	}
}
async function getAllAssets(){
	console.log("Dame");
	const result = await contract.evaluateTransaction('GetAllAssets');
	return result;
}

async function putAsset(asset){
	console.log("Saving");
	let result = await contract.submitTransaction('CreateAsset', asset.id, asset.color, asset.size, asset.owner, asset.value);
	console.log(result);
}

module.exports = {main, getAllAssets,putAsset}
