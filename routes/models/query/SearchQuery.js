const APPROOT = require('app-root-path');
const config = require(`${APPROOT}/config/config.json`);
const moment = require('moment');

const totalSearch = (params) => {
	const fDateFormatA = moment(params.fDate).format('YYYY-MM-DD');
	const fDateFormatB = moment(params.fDate).format('YYYYMMDD');
	const lDateFormatA = moment(params.lDate).format('YYYY-MM-DD');
	const lDateFormatB = moment(params.lDate).format('YYYYMMDD');

	const result = [
		{ index: config.sedaily_htmlstrip.index },
		{
			size: params.size,
			query: {
				bool: {
					must: [
						{
							multi_match: {
								query: params.inputText,
								fields: [
									"title*",
									"content*",
									"category.keyword",
									"category.kobrick",
									"reporter*",
								],
							},
						},
					],
				},
			},
			aggs: { byCategory: { terms: { field: 'category.keyword', size: 10 } } },
			highlight: {
				fields: {
					'title.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'content.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'category.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'reporter.ngram': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
				},
			},
			sort: [
				{ "update_dttm" : "desc"},
				{ "_score" : "desc" },
			]
		},

		{ index: config.thesis.index },
		{
			size: params.size,
			query: {
				bool: {
					must: [
						{
							multi_match: {
								query: params.inputText,
								fields: [
									"title_h*",
									"title_e*",
									"abstract*",
									"abstract_e*",
									"author*",
									"publisher*",
								],
							},
						},
					],
				},
			},
			aggs: { byCategory: { terms: { field: 'publisher.keyword', size: 10 } } },
			highlight: {
				fields: {
					'title_h.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'title_e.english': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'abstract.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'abstract_e.english': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'publish_date.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'publisher.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
					'author.kobrick': { pre_tags: '<span style="font-weight: bold; color: red; background-color: yellow">', post_tags: '</span>' },
				},
			},
			sort: [
				{ "_score" : "desc" },
				{ "publish_date_up" : "desc" },
				{ "_id" : "asc" }
			]
		},

		{ index: config.company.index },
		{
			size: params.size,
			query: {
				bool: {
					must: [
						{
							multi_match: {
								query: params.inputText,
								fields: [
									"cmp_nm.kobrick",
									"cmp_eng.keyword",
									"cmp_eng.english",
									"prmy_prdct_nm.kobrick",
								],
							},
						},
					],
				},
			},
			aggs: { byCategory: { terms: { field: 'prmy_prdct_nm.keyword', size: 10 } } },
			highlight: {
				fields: {
					'cmp_nm.kobrick': { pre_tags: '<span style=font-weight: bold; color: red; background-color: yellow>', post_tags: '</span>' },
					'cmp_eng_n,.english': { pre_tags: '<span style=font-weight: bold; color: red; background-color: yellow>', post_tags: '</span>' },
					'cmp_gnrl_nm.kobrick': { pre_tags: '<span style=font-weight: bold; color: red; background-color: yellow>', post_tags: '</span>' },
					'prmy_prdct_nm.kobrick': {
						pre_tags: '<span style=font-weight: bold; color: red; background-color: yellow>',
						post_tags: '</span>',
					},
				},
			},
			sort: [
				{ "_score" : "desc" },
				{ "fond_date" : "desc" },
				{ "_id" : "asc" }
			]
		},
	];

	/*
	if (params.page === '') {
		result[1].from = params.from;
		result[3].from = params.from;
		result[5].from = params.from;
	} else {
		result[1].from = (params.page - 1) * params.size;
		result[3].from = (params.page - 1) * params.size;
		result[5].from = (params.page - 1) * params.size;
	}
	*/

	if (params.fDate === undefined & params.lDate != undefined) {
		result[1].query.bool.must.push({ range: { update_dttm: { lte: lDateFormatA } } });
		result[3].query.bool.must.push({ range: { publish_date_up: { lte: lDateFormatB } } });
		result[5].query.bool.must.push({ range: { fond_date: { lte: lDateFormatB } } });
	} else if (params.fDate != undefined & params.lDate === undefined) {
		result[1].query.bool.must.push({ range: { update_dttm: { gte: fDateFormatA } } });
		result[3].query.bool.must.push({ range: { publish_date_up: { gte: fDateFormatB } } });
		result[5].query.bool.must.push({ range: { fond_date: { gte: fDateFormatB } } });
	} else if (params.fDate != undefined & params.lDate != undefined) {
		result[1].query.bool.must.push({ range: { update_dttm: { gte: fDateFormatA, lte: lDateFormatA } } });
		result[3].query.bool.must.push({ range: { publish_date_up: { gte: fDateFormatB, lte: lDateFormatB } } });
		result[5].query.bool.must.push({ range: { fond_date: { gte: fDateFormatB, lte: lDateFormatB } } });
	}

	return result;
};

module.exports = {
	totalSearch: totalSearch
};
