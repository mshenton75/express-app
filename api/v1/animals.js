var express = require('express');
var router = express.Router();
var animals = {
  'cat': 'meow',
  'dog': 'bark',
  'cow': 'moo'
}

router.use(function(req, res, next){
  console.log('Set route specific data here')
  next()
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(animals);
});

router.route('/animal')
  .get(function(req, res){
    name = req.query.name
    res.send(animals[name])
  })
  .post(function(req, res){
    animals[req.query.name] = req.query.sound
    res.sendStatus(204)
  })

module.exports = router;
