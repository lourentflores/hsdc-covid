const { Pool } = require('pg');
const keys = require('../../config/keys');

const PG_URI = keys.postgreSQL.dbURI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
