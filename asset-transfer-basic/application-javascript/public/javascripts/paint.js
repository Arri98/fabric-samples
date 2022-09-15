// eslint-disable-next-line strict
function f() {
	fetch('http://localhost:3000/assets').then(res =>{
		res.json().then( data => {
				console.log(data);
				data =  JSON.stringify(JSON.parse(data), null, 2);
				document.getElementById('assets').innerHTML = data;
		}
		)
	})
}

function bloque() {
	fetch('http://localhost:3000/block/'+document.getElementById("bloque").value).then(res =>{
		res.json().then( data => {
				console.log(data);
				 data = JSON.stringify(data);
				document.getElementById('block').innerHTML = data;
			}
		)
	})
}




function events() {
	fetch('http://localhost:3000/events').then(res =>{
		res.json().then( data => {
				console.log(data);
				data = JSON.stringify(data.events);
				document.getElementById('events').innerHTML = data;
			}
		)
	})
}

