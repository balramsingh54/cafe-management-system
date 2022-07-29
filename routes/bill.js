const connection = require('../connection');
const express = require('express');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');



router.post('/generateReport', (req, res)=>{
	const generateUuid = uuid.v1();
	const orderDetails = req.body;
	var productDetailsReport = JSON.parse(orderDetails.productDetails);

	let query = " insert into bill (name , uuid, email, contactNumber, paymentMethod, total, productDetails, createBy) values (?, ?, ?, ?, ?, ?, ?, ?) ";

	connection.query(query, [orderDetails.name, generateUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.createBy, res.locals.email], (err, results)=>{
		if (!err) {
			ejs.sendFile(path.join(__dirname,'',"report.ejs"),{productDetails: productDetailsReport, name: orderDetails.name, email: orderDetails.email, contactNumber:orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount}, (err, results)=>{
				if (err) {
					return res.status(500).json(err);
				}
				else{
					pdf.create(results).toFile('./generated_pdf'/+generateUuid+".pdf",function(err,data){
						if (err) {
							console.log(err);
							return res.status(500).json(err);
						}
						else{
							return res.status(200).json({uuid: generateUuid});
						}
					})
				}
			})
		}
		else{
			return res.status(500).json(err)
		}
	})
})


module.exports = router;