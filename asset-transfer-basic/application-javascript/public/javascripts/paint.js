// eslint-disable-next-line strict

let dataTemp = [];
let dataCoor= [];
let dataMove = [];
let dataPress = [];
let dataQual = [];
let dataHum = [];
let startTimestamp=Date.now();
let lastTimestamp=0;

function f() {
	fetch('http://localhost:3000/assets').then(res =>{
		res.json().then( data => {
				const jsonData = JSON.parse(data);
				// dataTemp = [];
				jsonData.forEach(d => {
					if(d.ID>lastTimestamp){
						console.log(jsonData);
						lastTimestamp=d.ID;
						temperatureDataset.datasets.forEach(dataset => {
							dataset.data.push({x:(d.ID-startTimestamp)/100, y:d.temperature});
						})
						humidityDataset.datasets.forEach(dataset => {
							dataset.data.push({x:(d.ID-startTimestamp)/100, y:d.humidity})
						});
						// coorChart.data.push({x:(d.ID-startTimestamp)/100, y:d.coordenates});
						pressureDataset.datasets.forEach(dataset => {dataset.data.push({x:(d.ID-startTimestamp)/100, y:d.pressure})	});
						movementDataset.datasets.forEach(dataset => {dataset.data.push({x:(d.ID-startTimestamp)/100, y:d.movement})	});
						qualityDataset.datasets.forEach(dataset => {dataset.data.push({x:(d.ID-startTimestamp)/100, y:d.airQuality})	});
					}
				});
				tempChart.update();
				qualChart.update();
				moveChart.update();
				pressChart.update();
				humChart.update();
				data =  JSON.stringify(jsonData, null, 2);
				document.getElementById('assets').innerHTML = data;
		}
		)
	})
}

function bloque() {
	fetch('http://localhost:3000/block/'+document.getElementById("bloque").value).then(res =>{
		res.json().then( data => {
				 data = JSON.stringify(data);
				document.getElementById('block').innerHTML = data;
			}
		)
	})
}

function events() {
	fetch('http://localhost:3000/events').then(res =>{
		res.json().then( data => {
				data = JSON.stringify(data.events);
				document.getElementById('events').innerHTML = data;
			}
		)
	})
}


const temperatureDataset = {
	datasets: [{
		label: 'Temperature',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: dataTemp,
		borderColor: 'black',
		borderWidth: 1,
		tension: 0,
		showLine: true

	}]
};


const configTemp = {
	type: 'scatter',
	data: temperatureDataset,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				min: -300,
				max: 300
			},
			y:{
				min:-10,
				max: 50
			}
		}
	}
};


const qualityDataset = {
	datasets: [{
		label: 'Quality',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: dataQual,
		borderColor: 'black',
		borderWidth: 1,
		tension: 0,
		showLine: true

	}]
};


const configQual = {
	type: 'scatter',
	data: qualityDataset,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				min: -300,
				max: 300
			},
			y:{
				min: 0,
				max: 100
			}
		}
	}
};


const movementDataset = {
	datasets: [{
		label: 'Movement',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: dataMove,
		borderColor: 'black',
		borderWidth: 1,
		tension: 0,
		showLine: true

	}]
};


const configMove = {
	type: 'scatter',
	data: movementDataset,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				min: -300,
				max: 300
			},
			y:{
				min: 0,
				max: 100
			}
		}
	}
};


const pressureDataset = {
	datasets: [{
		label: 'Pressure',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: dataPress,
		borderColor: 'black',
		borderWidth: 1,
		tension: 0,
		showLine: true

	}]
};


const configPress = {
	type: 'scatter',
	data: pressureDataset,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				min: -300,
				max: 300
			},
			y:{
				min:0,
				max: 100
			}
		}
	}
};


const cooridantesData = {
	datasets: [{
		label: 'Coordinates',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: dataCoor,
		borderColor: 'black',
		borderWidth: 1,
		tension: 0,
		showLine: true

	}]
};


const configCoor = {
	type: 'scatter',
	data: cooridantesData,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				min: -300,
				max: 300
			},
			y:{
				min: 0,
				max: 100
			}
		}
	}
};

const humidityDataset = {
	datasets: [{
		label: 'Humidity',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: dataHum,
		borderColor: 'black',
		borderWidth: 1,
		tension: 0,
		showLine: true

	}]
};


const configHum = {
	type: 'scatter',
	data: humidityDataset,
	options: {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				min: -300,
				max: 300
			},
			y:{
				min: 0,
				max: 100
			}
		}
	}
};

const tempChart = new Chart(
	document.getElementById('tempChart'),
	configTemp
);

const humChart = new Chart(
	document.getElementById('humChart'),
	configHum
);

const moveChart = new Chart(
	document.getElementById('moveChart'),
	configMove
);

const qualChart = new Chart(
	document.getElementById('qualChart'),
	configQual
);

const coorChart = new Chart(
	document.getElementById('coorChart'),
	configCoor
);

const pressChart = new Chart(
	document.getElementById('pressChart'),
	configPress
);





function fTimeout() {
	console.log("fetch")
	f();
	setTimeout(fTimeout,1000);
}

fTimeout();
