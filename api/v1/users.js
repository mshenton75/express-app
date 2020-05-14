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
  .get(async function(req, res, next) {
    await db.query('SELECT * FROM users', (err, response) => {
      if (err) {
        return next(err)
      }
      res.send(response.rows)
    })   
})
  .post(async (req, res, next) => {
    console.log(req.query.email)
    await db.query(
      // TODO: create models folder with model for each table and corresponding functions (e.g. create)
      // TODO: seperate into service classes)
      'INSERT INTO users (email, firstname, lastname, age) VALUES ($1, $2, $3, $4) RETURNING *', 
      [req.query.email, req.query.first_name, req.query.last_name, req.query.age], 
      (err, response) => {
        if (err){
          next(err)
        }
        res.send(response.rows[0])
      })
  })

router.get('/:id', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
  res.send(rows[0])
})

router.post('/greet', function(req, res){
  res.send(`Hi ${req.query.name}!`)
})

router.get('/:id', function(req, res){
  res.send(`The ID is ${req.params.id}`)
})

module.exports = router;
