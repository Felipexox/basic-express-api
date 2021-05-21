import { Router } from 'express';

import models, { connectDb } from '../models';

const router = Router();

router.post('/', async (req, res) => {
    let email = req.body.email;
    let pwd = req.body.password;

    
    console.log("Logged user " + email);
    try{
        const user = await req.context.models.User.existsAccountLogin(
            email,
            pwd
        );

        return res.send({token: user.token});
    }catch(e){

        return res.send("Usuario não encontrado");
    }
});

export default router;

