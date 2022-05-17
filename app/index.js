var http = require('http');
const { hostname } = require('os');

var username = process.env.RCUSER;
var password = process.env.RCPASS;
//var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

http.createServer(onRequest).listen(8081);

function onRequest(client_req, client_res) {
  
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  }; 
  var response = '<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?access_type=offline&amp;client_id=b15665d9-eda6-4092-8539-0eec376afd59&amp;redirect_uri=http%3A%2F%2Flocalhost%3A53682%2F&amp;response_type=code&amp;scope=Files.Read+Files.ReadWrite+Files.Read.All+Files.ReadWrite.All+offline_access&amp;state=1p8UXFA_nY6NeQ5Oap8ZXA">Temporary Redirect</a>''
  client_res.writeHead(200,headers);
  client_res.end(response);
}