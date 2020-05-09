import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
 
const router = Router();
 
router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
});
 
router.get('/:messageId', async (req, res) => {
    const message = await req.context.models.Message.findByPk(
        req.params.messageId
    );
    return res.send(message);
});
 
router.post('/', async (req, res) => {
    const id = uuidv4();
    const message = await req.context.models.Message.create({
        id,
        text: req.body.text,
        userId: req.context.me.id,
    });
 
    req.context.models.messages[id] = message;
    
    return res.send(message);
});
 
router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

// router.put('/messages/:messageId', (req, res) => {

//     let updatedMessage = {};
//     // if user is allowed, update message (req.me is set my custom middleware function above)

//     const messageId = req.params.messageId;
//     // update message
//     if (messageId && req.context.models.messages.hasOwnProperty(messageId)) {
//         if (req.context.me.id === req.context.models.messages[messageId].userId) {
//         updatedMessage = {
//             id: req.params.messageId,
//             text: req.body.text,
//             userId: req.context.me.id,
//         }        
//         const updatedMessages = {
//             ...req.context.models.messages,
//             [req.params.messageId]: updatedMessage
//         }            
//         req.context.models.messages = updatedMessages;
//         }
//     }

   
//     return res.send(updatedMessage);
// });
 
export default router;