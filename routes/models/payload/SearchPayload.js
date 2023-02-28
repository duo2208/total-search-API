const totalSearch = (req) => {
	console.log('req.body : ', req.body);

	const result = {};
	try {
		if (
			req.body == null ||
			req.body == '' ||
			req.body == undefined ||
			(req.body != null && typeof req.body == 'object' && !Object.keys(req.body).length)
		) {
			result.errorMessage = 'req.body is null';
		} else {
			result.inputText = req.body.inputText;
			result.from = req.body.from;
			result.size = req.body.size;
			result.page = req.body.page;
			result.fDate = req.body.fDate;
			result.lDate = req.body.lDate;
		}
	} catch (error) {
		console.log(error);
	}

	return result;
};

module.exports = {
	totalSearch: totalSearch,
};
