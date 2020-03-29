const knex = require('knex');
const comfiguration = require('../../knexfile');


const connection = knex(comfiguration.development);

module.exports = connection;