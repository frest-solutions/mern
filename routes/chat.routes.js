const ChatModel = require("../models/Chat");
const User = require('../models/User')
const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

const Chat = (io) => {

  io.on('read', async data => {
    console.log(data)
    await ChatModel.updateOne({_id: data._id}, {$set: {status: 3}})
  })

  router.get('/messages/:id', authMiddleware, async (req, res) => {
    const user = await User.findById(req.params.id)
    const sender = await User.findById(req.user.userId)

    if (req.params.id === req.user.userId) {

      await ChatModel.updateMany({
        _id: user.messages,
        sender: req.user.userId,
        to: req.user.userId
      }, {$set: {status: 2}})//delivered

      const chatList2 = await ChatModel.find({
        _id: user.messages,
        sender: req.user.userId,
        to: req.user.userId
      })

      io.emit(req.user.userId.toString(), chatList2)
      return res.json({message: 'ok'})

    } else {

      // await ChatModel.updateMany({_id: user.messages, to: req.user.userId}, {$set: {status: 'Доставлено'}})
      // await ChatModel.updateMany({_id: sender.messages, to: req.params.id}, {$set: {status: 'Доставлено'}})

      const userChat = await ChatModel.find({_id: user.messages, to: req.user.userId})
      const senderChat = await ChatModel.find({_id: sender.messages, to: req.params.id})

      const chatList = [...userChat, ...senderChat].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      io.emit(req.user.userId.toString(), chatList)
      return res.json({message: 'ok'})
    }
  })

  router.post('/send', authMiddleware, async (req, res) => {
    try {
      const {body: {msg, to}, user: {userId}} = req;

      if (!msg) {
        return res.status(400).json({message: 'Message can\'t be empty'});
      }

      const sender = await User.findById(userId)
      const senderName = sender?.name + ' ' + sender?.surname || sender.email

      const chat = new ChatModel({
        username: senderName,
        to: to,
        sender: userId,
        message: msg,
        status: 1 //sent
      })

      await User.updateMany({_id: [userId]}, {$push: {messages: chat._id}})
      await chat.save()

      io.emit('msg', chat)
      res.status(201).json({message: 'ok'})

    } catch (e) {
      res.status(500).json({message: 'sorry', data: e.message});
    }
  })

  router.post('/setRead/:id', authMiddleware, async (req, res) => {
    try {
      const {body: {msgs}, user: {userId}} = req;
      const senderId = req.params.id
      const msgsId = msgs.map(m => m._id)

      await ChatModel.updateMany({_id: msgsId, sender: senderId, to: userId}, {$set: {status: 3}})
      res.status(201).json({message: 'ok'})

    } catch (e) {
      res.status(500).json({message: 'sorry', data: e.message});
    }
  })

  // io.of('/').on('connect', async socket => {
  //   console.log('connected new socket')
  //   socket.emit('connect', 'connecting ...')
  //   socket.on('typing', async msg => {
  //     console.log(msg)
  //     socket.broadcast.emit('typing', {msg: msg.name})
  //   })
  //   try {
  //     socket.on('newMsg', async msg => {
  //       const chatList = await ChatModel.find()
  //         .sort({date: -1})
  //         .limit(10)
  //       io.emit('newMsg', {chats: chatList})
  //
  //       const chat = new ChatModel({
  //         username: msg.name,
  //         message: msg.msg
  //       })
  //       await chat.save()
  //       const chats = await ChatModel.find()
  //         .sort({date: -1})
  //         .limit(10)
  //       io.emit('msg', {chats: chats})
  //     })
  //   } catch (e) {
  //     console.log(e.message)
  //   }
  //
  //   socket.on('typing', name => {
  //     io.emit('typing', {name: `${name.name}`})
  //   })
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected')
  //   })
  // })

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


