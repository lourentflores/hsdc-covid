const { Pool } = require('pg');

const PG_URI =
  'postgres://jkzytnlg:g6x3XHjhRwsNZFxGxbr_SP4LgQMD8Iix@suleiman.db.elephantsql.com:5432/jkzytnlg';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
