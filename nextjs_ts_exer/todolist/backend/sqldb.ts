import mysql from 'serverless-mysql';

export const sqldb = mysql({
    config: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD
    },
    // add this to solve the issue at 'https://github.com/jeremydaly/serverless-mysql/issues/117'
    //library: require('mysql2')
  });