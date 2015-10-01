var querystring = require("querystring"),
        util = require('util'),
        formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('');
    response.end();
}

function show(response) {
	response.writeHead(500, {"Content-Type": "text/plain"});
//	response.write();
	response.end();
}

exports.start = start;
exports.show = show;