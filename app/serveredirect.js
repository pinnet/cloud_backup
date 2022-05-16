
var re = new RegExp('/v/(.*)/');


process.stdin.on('data',function(data){

    var match = re.exec(data);
    if (match) {
        process.stdout.write(data.toString().toUpperCase());
    }
    else{
        process.stdout.write(data.toString().toLowerCase());
    }

});
