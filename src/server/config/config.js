require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.PWORD,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: process.env.DB_DIALECT,
    define: { timestamps: false }
  },
  test: {
    username: process.env.T_DBUSER,
    password: process.env.T_PWORD,
    database: process.env.T_DB,
    host: process.env.T_DBHOST,
    dialect: process.env.T_DB_DIALECT,
    define: { timestamps: false }
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
