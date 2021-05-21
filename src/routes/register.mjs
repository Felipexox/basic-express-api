import { Router } from 'express';

import models, { connectDb } from '../models/index.mjs';

const router = Router();

router.post('/', async (req, res) => {
    let email = req.body.email;
    let pwd = req.body.password;

    console.log("Register user " + email);
    
    let user = new models.User({
        username: email,
        password: pwd,
        token: require('crypto').randomBytes(64).toString('hex')
        });

    await user.save();
    
    return res.send({token: user.token});
});

export default router;

