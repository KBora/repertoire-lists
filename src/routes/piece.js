import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const pieces = await req.context.models.Piece.findAll();
    return res.send(pieces);
  });
   
router.get('/:pieceId', async (req, res) => {
    const piece = await req.context.models.Piece.findByPk(
        req.params.pieceId,
    );
    return res.send(piece);
});

export default router;