import express from 'express';

let router = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

router.post('/', (req, res) => {
	
	console.log('REQ.BODY', req.body);
	console.log('REQ.BODY.USER.USERNAME', req.body.user.username)
	// check username & password
	res.send(true);
})


export default router;