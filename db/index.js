var knex ={};
knex.local = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : 'NEWPASSWORD',
    database : 'blogengine'
  }
});

knex.online = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'db4free.net',
    user     : 'gerald',
    password : '70377e',
    database : 'blogengine'
  }
});

module.exports = knex.local;

