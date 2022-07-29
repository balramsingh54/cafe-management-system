const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');

router.get('/details', (req, res, next)=>{
	var catagoryCount;
	var productCount;
	var billCount;

	var query = " select count(id) as catagoryCount from catagory";

	connection.query(query, (err, results)=>{
		if (!err) {
			catagoryCount = results[0].catagoryCount;
		}
		else{
			return res.status(500).json(err);
		}
	});

	var query = " select count(id) as productCount from product";
	connection.query(query, (err, results)=>{
		if (!err) {
			productCount = results[0].productCount;
		}
		else{
			return res.status(500).json(err);
		}
	});

	var query = " select count(id) as billCount from bill";
	connection.query(query, (err, results)=>{
		if (!err) {
			billCount = results[0].billCount;

			var data = {
				catagory : catagoryCount,
				product : productCount,
				bill : billCount
			};
			return res.status(200).json(data);
		}
		else{
			return res.status(500).json(err);
		}
	});
})

module.exports = router ;


