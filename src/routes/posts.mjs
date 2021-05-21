import { Router } from 'express';

const router = Router();

router.get('/all/', async (req, res) => {
   const posts = await req.context.models.Post.find();
   return res.send(posts);
});

router.get('/:title', async (req, res) => {
  const post = await req.context.models.Post.findById(
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
