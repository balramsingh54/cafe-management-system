require('dotenv').config();



function checkRoll(req, res, next) {
	if (res.locals.role== process.env.USER) {
		return res.sendStatus(401);
		next();
	}
}


module.exports = { checkRoll : checkRoll }