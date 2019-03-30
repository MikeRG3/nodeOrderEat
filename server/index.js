const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const app = express();

const { mongoose } = require('./database')

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
//FileUpload
app.use(fileUpload());
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
app.use('/carta', require('./routes/plato-routes'))
app.use('/usuario', require('./routes/usuario-routes'))
app.use('/mesa', require('./routes/mesa-routes'))
app.use('/sesion', require('./routes/sesion-routes'))
app.use('/pedido', require('./routes/pedido-routes'))

//Starting server
app.listen(app.get('port'), () => {
    console.log("Connected to port ", app.get('port'));
})