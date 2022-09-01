// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express = require('express')
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));

// connect to Back4App
// const Parse = require('parse/node');
// const appId = "ZRHltmoyyRT0gEkpTaSMf9mVhHEWohH9a0VJLqlV";
// const jsKey = "Expcuuye1DZ4iRH0hKpXilSneB6IcIBS6AW8SEgn";
// Parse.initialize(appId, jsKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
// Parse.serverURL = 'https://parseapi.back4app.com/';

// connection String url mongodb
const databaseUri = "mongodb://localhost:27017/RentHouseManagement"
// const databaseUri =  "mongodb://localhost:27017/DemoNoSQL"

const config = {
  databaseURI: databaseUri,
  cloud: __dirname + '/cloud/main.js',
  appId: 'RentHouseManagement',
  // appId: 'DemoNoSQL',
  masterKey: 'sa123', //Add your master key here. Keep it secret!
  serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
};
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = '/parse';
if (!test) {
  const api = new ParseServer(config);
  app.use(mountPath, api);
}


// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.PORT || 1337;
if (!test) {
  const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
