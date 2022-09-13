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

