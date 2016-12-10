var express = require('express');
//var pug = require('pug');
var app = express();

/*
app.set('views', __dirname + '/views')
app.set('view engine', 'pug');

app.get('/', function(req, res){
    res.render('index');
});
*/

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/:time', function(req, res){
    var passedDate = new Date(req.params.time);
    var passedDateMs = new Date(req.params.time * 1000);
    var date = {unix: null, natural: null};
    
    function getNaturalMonth(dateParam) {
        var month = null;
        switch(dateParam) {
            case 0: month = "January"; break;
            case 1: month = "February"; break;
            case 2: month = "March"; break;
            case 3: month = "April"; break;
            case 4: month = "May"; break;
            case 5: month = "June"; break;
            case 6: month = "July"; break;
            case 7: month = "August"; break;
            case 8: month = "September"; break;
            case 9: month = "October"; break;
            case 10: month = "November"; break;
            case 11: month = "December"; break;
        }
        return month;
    }
    
    function getUnixDate(dateParam) {
        return Date.UTC(
            dateParam.getUTCFullYear(),
            dateParam.getUTCMonth(),
            dateParam.getUTCDate(),
            dateParam.getUTCHours(),
            dateParam.getUTCMinutes(),
            dateParam.getUTCSeconds(),
            dateParam.getUTCMilliseconds()
        ) / 1000;
    }
    
  
    function getNaturalDate(dateParam) {
        if(getNaturalMonth(dateParam.getMonth())) {
            return getNaturalMonth(dateParam.getMonth()) + " " + dateParam.getDate() + ", " + dateParam.getFullYear();
        } else {
            return null;
        }
    }
    
    if(getUnixDate(passedDate)) {
        date.unix = getUnixDate(passedDate);
        date.natural = req.params.time;
    } else if(getNaturalDate(passedDateMs)) {
        date.unix = parseFloat(req.params.time);
        date.natural = getNaturalDate(passedDateMs);
    }

    res.send(date);
});

app.listen(process.env.PORT || '8080', function(){
    console.log('Started up on env port or 8080');
});
