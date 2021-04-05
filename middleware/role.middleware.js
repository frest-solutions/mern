const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (role) {
  return function (req, res, next) {

    if (req.method === 'OPTIONS') {
      return next()
    }

    try {

      const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"
      if (!token) {
        return res.status(401).json({message: 'Пользователь не авторизован'})
      }

      const decoded = jwt.verify(token, config.get('jwtSecret'))

      if (role !== decoded.role) {
        return res.status(403).json({message: 'У вас нет доступа'})
      }

      next()

    } catch (e) {
      res.status(403).json({message: 'У вас нет доступа'})
    }
  }
}
