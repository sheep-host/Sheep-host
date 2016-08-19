import express from 'express';

let userCheckRouter = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

userCheckRouter.post('/', (req, res) => {
	
	console.log('REQ.BODY', req.body);
	console.log('REQ.BODY.USER.USERNAME', req.body.user.username)
	
	var theUser = {'username' : req.body.user.username}
	// check username & password
	res.json(theUser);
	
})


export default userCheckRouter ;