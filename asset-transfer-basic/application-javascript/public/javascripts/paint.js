// eslint-disable-next-line strict

let dataTemp = [];
let startTimestamp=Date.now();
let lastTimestamp=0;

function f() {
	fetch('http://localhost:3000/assets').then(res =>{
		res.json().then( data => {
				const jsonData = JSON.parse(data);
				dataTemp = [];
				jsonData.forEach(d => {
					if(d.ID>lastTimestamp){
						console.log("New data")
						lastTimestamp=d.ID;
						myChart.data.datasets.forEach((dataset) => {
							dataset.data.push({x:(d.ID-startTimestamp)/100, y:d.temperature});
						});
						console.log(myChart.data.datasets);
					}
				});
				myChart.update();
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


const data = {
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


const config = {
	type: 'scatter',
	data: data,
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

const myChart = new Chart(
	document.getElementById('myChart'),
	config
);



function fTimeout() {
	console.log("fetch")
	f();
	setTimeout(fTimeout,1000);
}

fTimeout();
