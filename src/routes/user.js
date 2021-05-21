var Router =  require('express').Router;

const router = Router();

router.get('/', async (req, res) => {
  return res.send("IAOSFJOIASJFDOIASJDOIASJO")
  // const users = await req.context.models.User.find();
  // return res.send(users);
});

// router.get('/:userId', async (req, res) => {
//   const user = await req.context.models.User.findById(
//     req.params.userId,
//   );
//   return res.send(user);
// });

export default router;
