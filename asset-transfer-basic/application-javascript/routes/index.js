let express = require('express');
let { faker } = require ('@faker-js/faker');


let router = express.Router();
let {getAllAssets, putAsset, getBlock, getEvents, getDataFromTimestamp} = require('../app2');

/* GET home page. */
router.get('/sensorInfo', function(req, res, next) {
	res.render('view.ejs');
});

router.get('/', function(req, res, next) {
	res.render('view.ejs');
});

router.get('/blockchainInfo', function(req, res, next) {
	res.render('block.ejs');
});

router.get('/data',function (req,res) {
	getAllAssets().then(data => {
		data = JSON.stringify(JSON.parse(data), null, 2);
		res.json(data)
	});
});

router.post('/postData',function (req,res) {
	putAsset(req.body).then( () => {
		res.message = 'Datos guardados';
		res.redirect('/?message=Datos guardados');
	}
	);

});

router.get('/dataFrom/:timestamp',function (req,res) {
	getDataFromTimestamp(req.params.timestamp).then( data => {
			res.json(data);
	}
	);
});

router.get('/sensorInfo/dataFrom/:timestamp',function (req,res) {
	getDataFromTimestamp(req.params.timestamp).then( data => {
			res.json(data);
		}
	);
});

router.get('/blockchainInfo/block/:id',function (req,res) {
	getBlock(req.params.id).then(
		block => res.json(block)
	);
});

router.get('/events',function (req,res) {
	res.json({events:getEvents()})
})

module.exports = router;
