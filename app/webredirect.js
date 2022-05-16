var http = require('http');
const { hostname } = require('os');

var username = process.env.RCUSER;
var password = process.env.RCPASS;
var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');


var re = new RegExp('[a-zA-Z0-9\-\.]+\:[0-9]+\/', 'gi');

process.stdin.on('data',function(data){

    var match = re.exec(data);
    if (match) {
        var lio = data.lastIndexOf(match[0]);
        var d = data.toString();
        const URI =  d.substring(lio).split('/');
        const HOST = URI[0].toString().split(':');
        const PORT = HOST[1];
        const PATH = URI[1];
        
        process.env.RCADDRESS = HOST[0];
        process.env.RCPORT = PORT;
        process.env.RCPATH = PATH;

        console.log('RCADDRESS: ' + process.env.RCADDRESS);
        console.log('RCPORT: ' + process.env.RCPORT);
        console.log('RCPATH: ' + process.env.RCPATH);

    }
    
    console.log(data.toString());

});
http.createServer(onRequest).listen(8080);

function onRequest(client_req, client_res) {

    if( process.env.RCPATH != undefined ){
        //redirect
             console.log(process.env.RCPATH);
             client_res.writeHead(307, {  location: "http://127.0.0.1:53683/" });
             client_res.end();
    }
    else{
        var path  = client_req.url;
        console.log(path.toString());

        client_req.headers.host = "localhost";
        client_req.headers.authorization = auth;
        var options = {
            hostname: process.env.RCADDRESS,
            port: process.env.RCPORT,
            path: path,
            method: client_req.method,
            headers: client_req.headers
        };

        var proxy = http.request(options, function (res) {

            
                    client_res.writeHead(res.statusCode, res.headers)
                    res.pipe(client_res, {
                        end: true });
            }
        );

        client_req.pipe(proxy, {
            end: true
        });
    }  
}
