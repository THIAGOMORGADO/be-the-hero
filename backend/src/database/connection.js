const knex = require('knex');
const comfiguration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? comfiguration.test : comfiguration.development

const connection = knex(config);

module.exports = connection;