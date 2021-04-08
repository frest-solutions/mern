const ChatModel = require("../models/Chat");
const User = require('../models/User')
const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

const Chat = (io) => {
  // router.get('/messages', authMiddleware, async (req, res) => {
  //   const chatList = await ChatModel.find()
  //   return res.json({chats: chatList})
  // })

  router.get('/messages/:id', authMiddleware, async (req, res) => {

    const user = await User.findById(req.params.id)

    const chatList = await ChatModel.find({_id: user.messages})
    if (req.params.id === req.user.userId) {
      const chats = await ChatModel.find({_id: user.messages, to: req.user.userId})
      return res.json({chats: chats})
    }

    io.emit('msgUser', chatList.chats)
    return res.json({message: 'ok'})
  })

  router.post('/send', authMiddleware, async (req, res) => {
    try {
      const {body: {msg, to}, user: {userId}} = req;

      if (!msg) {
        return res.status(400).json({message: 'Message can\'t be empty'});
      }

      // const user = await User.findOne({id: userId});
      // console.log(user);
      // console.log(userId);
      // if (!user) {
      //   return res.status(400).json({message: 'Invalid user'});
      // }

      // const chat = new ChatModel({
      //   username: 'Some Abdu',
      //   message: msg
      // })

      // await chat.save();
      const sender = await User.findById(userId)
      const senderName = sender?.name + ' ' + sender?.surname || sender.email

      const chat = new ChatModel({
        username: senderName,
        to: to,
        sender: userId,
        message: msg
      })

      await User.updateMany({_id: [userId, to]}, {$push: {messages: chat._id}})
      await chat.save()

      io.emit('msg', chat)
      res.status(201).json({ok: 'ok', chat})


      //const chat = new ChatModel()
    } catch (e) {
      res.status(500).json({message: 'sorry', data: e.message});
    }
  })

  /*io.of('/').on('connect', async socket => {
    console.log('connected')
    socket.emit('connection', null)
    socket.on('typing', async msg => {
      console.log(msg)
      socket.broadcast.emit('typing', {msg: msg.name})
    })
    try {
      socket.on('msg', async msg => {
        const chatList = await ChatModel.find()
          .sort({date: -1})
          .limit(10)
        io.emit('msg', {chats: chatList})

        const chat = new ChatModel({
          username: msg.name,
          message: msg.msg
        })
        await chat.save()
        const chats = await ChatModel.find()
          .sort({date: -1})
          .limit(10)
        io.emit('msg', {chats: chats})
      })
    } catch (e) {
      console.log(e.message)
    }

    socket.on('typing', name => {
      io.emit('typing', {name: `${name.name}`})
    })
    socket.on('disconnect', () => {
      console.log('Disconnected')
    })
  })*/
  return router;
}
module.exports = Chat;


// router.get("/", (req, res) => {
//   Chat.find()
//
//   res.send({response: 'I am alive'}).status(200)
//   .populate('sender')
//   .exec((err, chats) => {
//     if (err) {
//       return res.status(400).send(err)
//     }
//     res.status(200).send(chats)
//   })
// });


