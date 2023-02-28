const APPROOT = require('app-root-path');
const config = require(`${APPROOT}/config/config.js`);
const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
	host: config.ELASTICSEARCH_SE_HOST,
	requestTimeout: config.ELASTICSEARCH_TIMEOUT
});


module.exports = elasticClient;
