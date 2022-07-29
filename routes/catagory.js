const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth =  require('../services/authentication');
const checkRole = require('../services/checkRoll');

router.post('/add', (req, res)=>{
	let catagory = req.body;
	query = " insert into catagory(name) values (?)";

	connection.query(query, [catagory.name], (err, results)=>{
		if (!err) {
			return res.status(200).json({message: "Catagory Added successfully. "});
		}
		else{
			return res.status(500).json(err)
		}
	})
})


router.get('/get', (req, res)=>{
	query = "select * from catagory ordered by name ";

	connection.query(query, (err, results)=>{
		if (!err) {
			return res.status(200).json(results);
		}
		else{
			return res.status(500).json(err);
		}
	});
});


router.patch('/update', (req, res, next)=>{
	const product = req.body;
	query = " update catagory set name = ? where id = ? ";

	connection.query(query, [product.name, product.id], (err, results)=>{
		if (!err) {
			if (results.affectedRows == 0) {
				return res.status(404).json({message:"catagory id does not found. "});
			}
			else{
				return res.status(200).json({message: "catagory updated successfully. "});
			}
		}
		else{
			return res.status(500).json(err);
		}
	})
})


module.exports = router;