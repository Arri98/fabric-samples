let express = require('express');
let router = express.Router();
let {getAllAssets, putAsset} = require('../app2');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('main', {message: ''});
});

router.get('/assets',function (req,res) {
	console.log("Me llaman")
	getAllAssets().then(assets => {
		assets = JSON.stringify(JSON.parse(assets), null, 2);
		console.log(assets);
		res.json(assets)});
});

router.post('/postData',function (req,res) {
	putAsset(req.body).then( () => {
			res.render('main', {message: 'Se procedio a la guardacion'});
	}
	);

})

module.exports = router;
