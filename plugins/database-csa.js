'use strict';

const mssql = require('mssql');

const internals = {};

exports.options = internals.options = {
  user: process.env.CSADB_USER,
  password: process.env.CSADB_PASSWORD,
  server: process.env.CSADB_SERVER,
  database: process.env.CSADB_DATABASE,
};

exports.register = (server, options, next) => {
  server.ext('onPreStart', (request, reply) => {
    mssql.connect(internals.options).catch(err => console.log(err));
    server.app.minsaitdb = mssql;
    return reply();
  });

  server.ext('onPreStop', (request, reply) => {
    if (!server.app.minsaitdbdb) return reply();
    server.app.minsaitdb.close();
    return reply();
  });
  return next();
};

exports.register.attributes = {
  name: 'DatabaseCsa',
};
