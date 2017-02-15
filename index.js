var express = require("express");
var app = express();

app.get('/', function(req, res) {
    var header = req.headers;
    var ans = {"ipaddress": null, 'language': null, 'software': null};
    
    ans.ipaddress = header['x-forwarded-for'];
    ans.language = getLanguage(header['accept-language']);
    ans.software = getSoftware(header['user-agent']);
    
    res.send(ans);
});

function getLanguage(lanstr) {
    return lanstr ? lanstr.slice(0, lanstr.indexOf(',')) : null;
}

function getSoftware(softstr) {
    return softstr ? 
            softstr.slice(softstr.indexOf('(') + 1, softstr.indexOf(')')) : 
            null;
}

app.listen(8080, function() {
    console.log('express app listening on port 8080!');
});