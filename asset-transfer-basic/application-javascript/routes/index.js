let express = require('express');
let router = express.Router();
let {getAllAssets, putAsset, getBlock, getEvents} = require('../app2');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.query.message){
		res.render('main',{message: req.query.message})
	}else{
		res.render('main', {message: ''});
	}
});

router.get('/assets',function (req,res) {
	console.log("Me llaman")
	getAllAssets().then(assets => {
		assets = JSON.stringify(JSON.parse(assets), null, 2);
		res.json(assets)});
});

router.post('/postData',function (req,res) {
	putAsset(req.body).then( () => {
		res.message = 'Se procedio a la guardacion';
			res.redirect('/?message=Se procedio a la guardacion');
	}
	);

});

router.get('/block/:id',function (req,res) {
	console.log("Me piden bloque");
	console.log(req.params.id);
	getBlock(req.params.id).then(
		block => res.json(block)
	);

});

router.get('/events',function (req,res) {
	console.log("Me piden events");
	res.json({events:getEvents()})
})

module.exports = router;
