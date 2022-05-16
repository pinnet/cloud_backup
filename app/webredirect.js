
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
    }

});
