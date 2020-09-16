
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

exports.getText = function() {
    return 'hello from node context';
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'false'
}));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/build/' + req.path);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

// перебрал старый вариант
app.post('/answers', function(req, res) {
    const filename = 'out.csv';
    const data = JSON.parse(JSON.stringify((req.body)));

    // записываем заголовки только если файл не существует
    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, getCSVHeader(data))
    };
    
    // в любом случае аппендим массив ответов
    fs.appendFile(filename, getCSVData(data), (err) => {
        if (err) {
            throw err;
        }
        return res.sendStatus(200);
    });
});

function getCSVHeader(objArray) {
    let rows = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let header = '';

    rows.forEach(element => {
        if (element.hasOwnProperty('title'))
            header += element.title + ';';
            if (element.hasOwnProperty('name'))
            header += element.name + ';';
    });

    return header + '\r\n';
}
;

function getCSVData(objArray) {
    let rows = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let row = '';

    rows.forEach(element => {
        console.log(JSON.stringify(element));
        if (element.hasOwnProperty('answer'))
            row += element.answer + ';'
        if (element.hasOwnProperty('selected'))
            row += element.selected? 'Да'+ ';' : 'Нет' + ';'
    });

    return row+'\r\n';
}
;

exports.runServer = function() {
    app.listen(3000, function() {
        console.log('Quest running on port 3000 ...');
    });
};
