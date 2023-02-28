const searchService = require('../../service/SearchService');
const searchPayload = require('../../models/payload/SearchPayload');
const searchResponse = require('../../models/response/SearchResponse');

// 통합검색 (title, content, reporter, category, update_dttm)
const totalSearch = async (req, res) => {
	const servicePayload = searchPayload.totalSearch(req);
	const serviceData = await searchService.totalSearch(servicePayload);
	if (servicePayload.errorMessage == undefined) {
		searchResponse.totalSearch(serviceData, res);
	} else {
		searchResponse.errorMessage(serviceData, res);
	}
};

// 뉴스검색
const sedailySearch = async (req, res) => {
	const servicePayload = searchPayload.totalSearch(req);
	const serviceData = await searchService.totalSearch(servicePayload);
	if (servicePayload.errorMessage == undefined) {
		searchResponse.sedailySearch(serviceData, res);
	} else {
		searchResponse.errorMessage(serviceData, res);
	}
};

// 논문검색
const thesisSearch = async (req, res) => {
	const servicePayload = searchPayload.totalSearch(req);
	const serviceData = await searchService.totalSearch(servicePayload);
	if (servicePayload.errorMessage == undefined) {
		searchResponse.thesisSearch(serviceData, res);
	} else {
		searchResponse.errorMessage(serviceData, res);
	}
};

// 뉴스검색
const companySearch = async (req, res) => {
	const servicePayload = searchPayload.totalSearch(req);
	const serviceData = await searchService.totalSearch(servicePayload);
	if (servicePayload.errorMessage == undefined) {
		searchResponse.companySearch(serviceData, res);
	} else {
		searchResponse.errorMessage(serviceData, res);
	}
};

module.exports = {
	totalSearch: totalSearch,
	sedailySearch: sedailySearch,
	thesisSearch: thesisSearch,
	companySearch: companySearch
};
