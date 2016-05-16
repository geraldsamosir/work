var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : 'NEWPASSWORD',
    database : 'blogengine'
  }
});
module.exports = knex;

