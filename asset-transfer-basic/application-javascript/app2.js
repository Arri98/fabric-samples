'use strict';
const config = require('./pollConfig');
const fetch = require('node-fetch');

const { Gateway, Wallets } = require('fabric-network');
const {BlockDecoder} = require('fabric-common');

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
let qscc;
let listener;
let events = [];

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

		console.log("got blockDecoder");

		//Get el contrato de pedir bloques
		qscc = network.getContract('qscc');
		console.log("got qscc");

		// Get the contract from the network.
		contract = network.getContract(chaincodeName);
		console.log("got contract");

		listener = await network.addBlockListener(async (blockEvent) => {
			let data =blockEvent.blockData;
			if(events.lenght > 500) {
				events.pop();
			}
			events.push(data.header);
		});
		console.log("Set listener");

		fetchData();

	}catch (e) {
		console.error(`******** FAILED to run the application: ${e}`);
	}
}

//Devuelve
async function getAllData(){
	const result = await contract.evaluateTransaction('GetAllAssets');
	return result;
}

//Guarda medida
async function putData(data){
	let {timestamp, temperature, pressure, humidity, airQuality, movement, coordenates } = {...data}
	let result = await contract.submitTransaction('CreateAsset', timestamp, temperature, pressure, humidity, airQuality, movement, coordenates );
}

//Info del bloque pedido
async function getBlock(blockNumber){
	const resultByte = await qscc.evaluateTransaction(
		'GetBlockByNumber', channelName, String(blockNumber));
	let text = BlockDecoder.decode(resultByte);
	console.log(text);
	return  ({header: text.header, hash: text.data_hash, singature: text.signature_header, metadata: text.metadata.metadata});
}

//Eventos desde la ultima peticion
function getEvents() {
	let temp = events;
	events = [];
	return temp;
}

const fetchData = async () => {
	const data = await fetch(config.route);
	const jsonData = await data.json();

	jsonData.forEach((sensorData)=>{
		putData(sensorData);
	});
	setTimeout(fetchData, config.timeout);
};


async function getDataFromTimestamp(timestamp) {
	let allData = await getAllData();
	allData = JSON.parse(JSON.stringify(JSON.parse(allData), null, 2));
	let tempDataFrom = [];
	console.log(typeof allData);
	allData.forEach(data=>{
		if(data.ID>timestamp){
			tempDataFrom.push(data);
		}
	});
	return tempDataFrom;
}

module.exports = {main, getAllAssets: getAllData,putAsset: putData, getBlock, getEvents, fetchData, getDataFromTimestamp};
