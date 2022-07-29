const express = require('express');
const router = express.Router();
const connection = require('../connection');
const auth = require('../services/authentication');
const checkRole = require('../services/checkRoll');

router.post('/add', (req, res)=>{
	const product = req.body;
	let query = "insert into product (name, catagoryId, description, price, status) values (?, ?, ?, ?, 'true')";

	connection.query(query, [product.name, product.catagoryId, product.description, product.price], (err, results)=>{
		if(!err){
			return res.status(200).json({message: "Product Added successfully. "});
		}
		else{
			return res.status(500).json(err);
		}
	})
})


router.get('/get', (req, res)=>{
	query = " select p.id, p.name, p.description, p.price, p.status, c.id as catagoryId, c.name as catagoryName from product as p INNER JOIN catagory as c where p.catagoryId = c.id ";

	connection.query(query, (err, results)=>{
		if (!err) {
			return res.status(200).json(results);
		}
		else{
			return res.status(500).json(err);
		}
	})
})



router.get('/getById/:id', (req, res)=>{
	const id = req.params.id;
	var query = " select id, name, description, price from product where id = ? ";

	connection.query(query, [id], (err, results)=>{
		if (!err) {
			return res.status(200).json(results[0]);
		}
		else{
			return res.status(500).json(err);
		}
	})
});


router.patch('/update', (req, res, next)=>{
	let product = req.body;
	let query = " update product set name = ?, catagoryId = ?, description = ?, price = ? where id = ?";

	connection.query(query, [product.name, product.catagoryId, product.description, product.price, product.id], (err, results)=>{
		if (!err) {
			if (results.affectedRows == 0) {
				return res.status(404).json({message:"Product id does not exists. "});
			}
			else{
				return res.status(200).json({message:"Product updated successfully. "});
			}
		}
		else{
			return res.status(500).json(err);
		}
	});

});

router.delete('/delete/:id', (req, res, next)=>{
	const id = req.params.id;
	let query = " delete from product where id = ? ";

	connection.query(query, [id], (err, results)=>{
		if (!err) {
			if (results.affectedRows == 0) {
				return res.status(404).json({message:"Product id does not exists. "});
			}
			else{
				return res.status(200).json({message: "Product deleted successfully. "});
			}
		}
		else{
			return res.status(500).json({message:" something error. Please try later again. "});
		}
	})
})

module.exports = router;