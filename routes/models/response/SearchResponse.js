const totalSearch = (data, res) => {
	const sedaily = data.data.responses[0].hits.hits;
	const sedailyTotal = data.data.responses[0].hits.total.value;
	const sedailyCategory = data.data.responses[0].aggregations.byCategory.buckets;
	const sedailyStatus = data.data.responses[0].status;

	const thesis = data.data.responses[1].hits.hits;
	const thesisTotal = data.data.responses[1].hits.total.value;
	const thesisCategory = data.data.responses[1].aggregations.byCategory.buckets;
	const thesisStatus = data.data.responses[1].status;

	const company = data.data.responses[2].hits.hits;
	const companyTotal = data.data.responses[2].hits.total.value;
	const companyCategory = data.data.responses[2].aggregations.byCategory.buckets;
	const companyStatus = data.data.responses[2].status;

	console.log('sedaily_status : ', sedailyStatus, 'sedaily_total : ', sedailyTotal);
	console.log('thesis_status : ', thesisStatus, 'thesis_total : ', thesisTotal);
	console.log('company_status : ', companyStatus, 'company_total : ', companyTotal);

	const searchSedaily = sedaily.map((data) => {
		return {
			title: data._source.title,
			reporter: data._source.reporter,
			category: data._source.category,
			content: data._source.content,
			update_dttm: data._source.update_dttm,
			sedaily_highlight: data.highlight,
		};
	});
	const searchSedailyCategory = sedailyCategory.map((data) => {
		return {
			key: data.key,
			doc_count: data.doc_count,
		};
	});

	const searchThesis = thesis.map((data) => {
		return {
			title_h: data._source.title_h,
			title_e: data._source.title_e,
			title_eq: data._source.title_eq,
			abstract: data._source.abstract,
			abstract_e: data._source.abstract_e,
			author: data._source.author,
			publisher: data._source.publisher,
			publish_date: data._source.publish_date,
			publish_date_up: data._source.publish_date_up,
			ministry_name: data._source.ministry_name,
			deep_link: data._source.deep_link,
			thesis_highlight: data.highlight,
		};
	});
	const searchThesisCategory = thesisCategory.map((data) => {
		return {
			key: data.key,
			doc_count: data.doc_count,
		};
	});

	const searchCompany = company.map((data) => {
		return {
			cmp_nm: data._source.cmp_nm,
			cmp_gnrl_nm: data._source.cmp_gnrl_nm,
			cmp_eng_nm: data._source.cmp_eng_nm,
			telno: data._source.telno,
			faxno: data._source.faxno,
			prmy_prdct_nm: data._source.prmy_prdct_nm,
			smes_highlight: data.highlight,
		};
	});
	const searchCompanyCategory = companyCategory.map((data) => {
		return {
			key: data.key,
			doc_count: data.doc_count,
		};
	});

	res.render('total', {
		url : 'total',
		sedailyTotal: sedailyTotal,
		searchSedaily: searchSedaily,
		thesisTotal: thesisTotal,
		searchThesis: searchThesis,
		companyTotal: companyTotal,
		searchCompany: searchCompany
	});
};

const sedailySearch = (data, res) => {
	const sedaily = data.data.responses[0].hits.hits;
	const sedailyTotal = data.data.responses[0].hits.total.value;
	const sedailyCategory = data.data.responses[0].aggregations.byCategory.buckets;
	const sedailyStatus = data.data.responses[0].status;

	console.log('sedaily_status : ', sedailyStatus, 'sedaily_total : ', sedailyTotal);

	const searchSedaily = sedaily.map((data) => {
		return {
			title: data._source.title,
			reporter: data._source.reporter,
			category: data._source.category,
			content: data._source.content,
			update_dttm: data._source.update_dttm,
			sedaily_highlight: data.highlight,
		};
	});
	const searchSedailyCategory = sedailyCategory.map((data) => {
		return {
			key: data.key,
			doc_count: data.doc_count,
		};
	});

	res.render('sedaily', {
		url : 'sedaily',
		sedailyTotal: sedailyTotal,
		searchSedaily: searchSedaily
	});
};

const thesisSearch = (data, res) => {
	const thesis = data.data.responses[1].hits.hits;
	const thesisTotal = data.data.responses[1].hits.total.value;
	const thesisCategory = data.data.responses[1].aggregations.byCategory.buckets;
	const thesisStatus = data.data.responses[1].status;

	console.log('thesis_status : ', thesisStatus, 'thesis_total : ', thesisTotal);

	const searchThesis = thesis.map((data) => {
		return {
			title_h: data._source.title_h,
			title_e: data._source.title_e,
			title_eq: data._source.title_eq,
			abstract: data._source.abstract,
			abstract_e: data._source.abstract_e,
			author: data._source.author,
			publisher: data._source.publisher,
			publish_date: data._source.publish_date,
			publish_date_up: data._source.publish_date_up,
			ministry_name: data._source.ministry_name,
			deep_link: data._source.deep_link,
			thesis_highlight: data.highlight,
		};
	});
	const searchThesisCategory = thesisCategory.map((data) => {
		return {
			key: data.key,
			doc_count: data.doc_count,
		};
	});

	res.render('thesis', {
		url : 'thesis',
		thesisTotal: thesisTotal,
		searchThesis: searchThesis,
	});
};

const companySearch = (data, res) => {
	const company = data.data.responses[2].hits.hits;
	const companyTotal = data.data.responses[2].hits.total.value;
	const companyCategory = data.data.responses[2].aggregations.byCategory.buckets;
	const companyStatus = data.data.responses[2].status;

	console.log('company_status : ', companyStatus, 'company_total : ', companyTotal);

	const searchCompany = company.map((data) => {
		return {
			cmp_nm: data._source.cmp_nm,
			cmp_gnrl_nm: data._source.cmp_gnrl_nm,
			cmp_eng_nm: data._source.cmp_eng_nm,
			telno: data._source.telno,
			faxno: data._source.faxno,
			prmy_prdct_nm: data._source.prmy_prdct_nm,
			smes_highlight: data.highlight,
		};
	});
	const searchCompanyCategory = companyCategory.map((data) => {
		return {
			key: data.key,
			doc_count: data.doc_count,
		};
	});

	res.render('company', {
		url : 'company',
		companyTotal: companyTotal,
		searchCompany: searchCompany
	});
};

const errorMessage = (data, res) => {
	console.log(data);
	console.log(data.errorMessage);
	const errorMessage = data.errorMessage;
	res.json({ errorMessage: errorMessage });
};

module.exports = {
	totalSearch: totalSearch,
	sedailySearch: sedailySearch,
	thesisSearch: thesisSearch,
	companySearch: companySearch,
	errorMessage: errorMessage
};