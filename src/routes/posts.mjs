import { Router } from 'express';

import models, { connectDb } from '../models/index.mjs';

const router = Router();

router.get('/', async (req, res) => {
   const posts = await req.context.models.Post.find();
   return res.send(posts);
});

router.get('/:title', async (req, res) => {
  const post = await req.context.models.Post.findByTitle(
    req.params.title,
  );
  return res.send(post);
});


router.post('/register/', async (req, res) => {
    let title = req.body.title;
    let desc = req.body.desc;

    console.log("Save post title: " + title);
    
    try{
        let post = new models.Post({
            title: title,
            description: desc,
            });

        await post.save();
        return res.send();
    }catch(exception){
        return res.send("Error to create post");
    }
});


export default router;
