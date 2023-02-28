const APPROOT = require('app-root-path');

const elasticClient = require(`${APPROOT}/middleware/elasticClient`);
const elasticQuery = require('../models/query/SearchQuery');

const totalSearch = async (params) => {
	const result = {};

	console.log('params.dataNull : ' + params.errorMessage);
	console.log(typeof params.errorMessage);

	try {
		if (params.errorMessage == undefined) {
			const searchQuery = await elasticQuery.totalSearch(params);
			const searchData = await elasticClient.msearch({ body: searchQuery });	// [!] body 로 담아서 실행
			result.data = searchData;
		} else {
			result.errorMessage = params.errorMessage;
		}
	} catch (error) {
		console.log(error);
	}

	return result;
};

module.exports = {
	totalSearch: totalSearch,
};
