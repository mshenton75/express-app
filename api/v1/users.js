var express = require('express');
var router = express.Router();
const rfr = require('rfr')
const db = rfr('db')

router.use(function(req, res, next){
  console.log('Set route specific data here')
  next()
})
/* GET users listing. */
router.route('/')
  .get(function(req, res, next) {
    db.query('SELECT * FROM users', (err, response) => {
      if (err) {
        return next(err)
      }
      res.send(response.rows)
    })
});

router.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, response) => {
    if (err) {
      return next(err)
    }
    res.send(response.rows[0])
  })
})

router.post('/greet', function(req, res){
  res.send(`Hi ${req.query.name}!`)
})

router.get('/:id', function(req, res){
  res.send(`The ID is ${req.params.id}`)
})

module.exports = router;
