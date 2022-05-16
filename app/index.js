var http = require('http');
const { hostname } = require('os');
var username = process.env.RCUSER;
var password = process.env.RCPASS;

var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
http.createServer(onRequest).listen(80);

function onRequest(client_req, client_res) {
  
 // console.log('serve: ' + client_req.url);

  client_req.headers.host = "localhost";
  client_req.headers.authorization = auth;
  
  var options = {
    hostname: process.env.RCADDRESS,
    port: process.env.RCPORT,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
 
  
}