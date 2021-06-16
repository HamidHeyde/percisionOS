//Packages
var http = require('http');
var https = require('https');
const fs = require('fs');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var gameDAO = require('./api/DAOs/game.DAO');
require('dotenv').config({path: '.env'})

//Variables
const HTTP_PORT = process.env.PORT || process.env.HTTP_PORT;
const HTTPS_PORT = process.env.PORT || process.env.HTTPS_PORT;

//nodeEnvironment
var nodeEnvironment = typeof(process.env.NODE_ENV)!= undefined ? process.env.NODE_ENV : 'development';
nodeEnvironment = (['development','production'].indexOf(nodeEnvironment))>-1 ? nodeEnvironment : 'development';
process.env.NODE_ENV = nodeEnvironment;

//APP
var app = require('./api/server');

// HTTP Server
const httpServer = http.createServer(app);
var options = {
    key: fs.readFileSync(path.join(__dirname, 'certificates','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'certificates', 'cert.pem'))
}
const httpsServer = https.createServer(options,app);

//Checking Certificates
const {X509Certificate} = require('crypto');
const x509 = new X509Certificate(fs.readFileSync(path.join(__dirname,'certificates', 'cert.pem')));
const value = x509.verify(x509.publicKey);
(value)
?console.log(' ==> VALID X509 Certificate!')
:console.log(' ==> IN-VALID X509 Certificate!')

//MongoDB
MongoClient.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize:50,
        connectTimeoutMS:5000,
        writeConcern: {
            j: true
        }
    }
  )
    .catch(err => {
      console.error(err.stack)
      process.exit(1);
    })
    .then(async client => {
        //Connect to User collection
        await gameDAO.injectDB(client);
      
    //HTTP Server
    httpServer.listen(HTTP_PORT,function(){
        console.log(`[HTTP] app is listening on port => ${HTTP_PORT} in ${nodeEnvironment}`)
    });
    httpsServer.listen(HTTPS_PORT,function(){
        console.log(`[HTTP] app is listening on port => ${HTTPS_PORT} in ${nodeEnvironment}`)
    });
    
})