const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path');
const multer = require('multer');
const authMiddleware = require('./middleware/auth.middleware')
const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors())
app.use(cookieParser());
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/task', require('./routes/task.routes'))
app.use('/api/category', require('./routes/category.routes'))
app.use('/upload', express.static('upload'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({storage: storage}).single('file')

app.post("/api/upload", authMiddleware, (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(500)
        .json({message: 'Что-то пошло не так, попробуйте снова'})
    }
    console.log(res.req.file)
    return res.json({message: 'Файл успешно загружён', url: res.req.file.filename})
  })
});

// const PORT = config.get('port') || 5000
const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

if (process.env.NODE_ENV === "production") {

  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

start()


