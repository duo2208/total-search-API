const express = require('express');
const router = express.Router();
const searchController = require('./search/SearchController');

// 통합검색 (title, content, reporter, category, update_dttm)
router.get('/total-search', async (req, res) => {
    res.render('total', {url: 'total'});
});
router.get('/sedaily-search', async (req, res) => {
    res.render('sedaily', {url: 'sedaily'});
});
router.get('/thesis-search', async (req, res) => {
    res.render('thesis', {url: 'thesis'});
});
router.get('/company-search', async (req, res) => {
    res.render('company', {url: 'company'});
});

router.post('/total-search', searchController.totalSearch)
router.post('/sedaily-search', searchController.sedailySearch)
router.post('/thesis-search', searchController.thesisSearch)
router.post('/company-search', searchController.companySearch)


module.exports = router;
