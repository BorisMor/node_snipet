var http = require("http");
var url = require("url");
var fs = require("fs");
// var util = require("util");

var settings = {
    dir: __dirname,
    content: __dirname + "/web/"
};

/**
 * request  - запрос -  https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * response - ответ -   https://nodejs.org/api/http.html#http_class_http_serverresponse
 */

var server = http.createServer(function(request, response) {
    console.log(request.method, request.url);
    var path = url.parse(request.url).pathname;
    var loadFile = (path == '/') ? 'index.html' : path

    fs.readFile(settings.content + loadFile, function(error, data) {
        if (error) {
            console.log("error: " + error);
            response.writeHead(404);
            response.write("404 - not found");
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
        }

        response.end();
    });

    /*
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(util.inspect(data)); // debug
    */
});

server.listen(8080);
console.log("Server is listening localhost:8080");