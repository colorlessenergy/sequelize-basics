const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './basics.sqlite',

  operatorsAliases: false
});

const User = sequelize.define('user', {
  title: Sequelize.STRING,
});

sequelize.sync({force: true})
  .then(() => User.create({
    title: 'hi friend',
  }))
  .then(title => {
    console.log(title.toJSON());
  });

  app.use(express.static('public'));



app.get("/title", (req, res) => {
  User.findById(1).then(user => {
    let object = {title: user.title};
    var JSONdata = JSON.stringify(object);
    res.send(JSONdata);
  });
});

app.post('/send', (req, res) => {
  User.findById(1).then(user => {
    user.update({
      title: req.body.title
    }).then(() => {
      res.send({redirect: '/'});
    })
  });

  res.redirect('/')
 });

 app.listen(3000, () => {
  console.log("Server listening on port " + 3000);
 });