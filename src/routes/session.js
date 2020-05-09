import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const user = await req.context.models.User.findByPk(
        req.context.id,
    );
    return res.send(user);
});

export default router;