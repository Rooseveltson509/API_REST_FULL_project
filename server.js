require('dotenv').config()
var express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
//const expressOasGenerator = require('express-oas-generator');
var bodyParser = require('body-parser');
let apiRouter = require('./apiRouter').router
let cors = require('cors')
const corsOptions = require('./funcs/functions')
let config = require('./config/config')

// Instanciate server
var server = express();
//expressOasGenerator.init(server, {}); // to overwrite generated specification's values use second argument.
server.use(cors(corsOptions.corsOptionsDelegate))

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(config.rootAPI + 'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure routes
server.get(config.rootAPI, function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Welcom to the ApiRestFull server</h1>');
})

server.use(config.rootAPI, apiRouter)

// launch server
server.listen(3000, function(){
    console.log(new Date().toLocaleString());
    console.log('Server en écoute');
})