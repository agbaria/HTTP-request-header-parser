var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 3000));

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

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get("port"), function() {
    console.log('express app listening on port ', app.get("port"));
});