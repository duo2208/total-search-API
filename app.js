const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const APPROOT = require('app-root-path');
const config = require(`${APPROOT}/config/config`);
const proxyServer = require(`${APPROOT}/routes/index`);

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended : true } ));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/js', express.static(path.join(__dirname,  'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.set('view engine', 'ejs');
app.set('views', './views');

proxyServer(app);

const PORT = config.API_SERVICE_PORT;
app.set(PORT);

const handleListening = () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

module.exports = app;
