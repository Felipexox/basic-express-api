import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
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
