var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    console.log('!!!!!!!!!!!!!!!!')
    return res.json({'ok':true})
});

function ConvertToCSV(objArray) {
    let rows = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let  header = "";
    Object.keys(rows[0]).map(pr => (header += pr + ";"));

    let str = "";
    rows.forEach(row => {
        let line = "";
        let columns =
            typeof row !== "object" ? JSON.parse(row) : Object.values(row);
        columns.forEach(column => {
            if (line !== "") {
                line += ";";
            }
            if (typeof column === "object") {
                line += JSON.stringify(column);
            }  else {
                line += column;
            }
        });
        str += line + "\r\n";
    });
    return header + "\r\n" + str;
}

router.post('/', function(req, res, next) {

    console.log(JSON.stringify(req.body));
    const data = JSON.parse (JSON.stringify((req.body)));

    fs.appendFile('answers.csv', ConvertToCSV(data), (err) => {
        if (err) {
            console.error('Couldn\'t append the data');
            throw err;
        }
        console.log('The data was appended to file!');
        return res.sendStatus(200);
    });
});


// function ConvertToCSV2(objArray){
    //     const items = objArray;
    //     const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    //     const header = Object.keys(items[0])
    //     let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    //     csv.unshift(header.join(','))
    //     csv = csv.join('\r\n')
    
    //     return csv;
    // }
    
    // function ConvertToCSV3 (objArray){
    //     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    
    //         var str = '';
    
    //         for (var i = 0; i < array.length; i++) {
    //             var line = '';
    
    //             for (var index in array[i]) {
    //                 line += array[i][index] + ',';
    //             }
    
    //             // Here is an example where you would wrap the values in double quotes
    //             // for (var index in array[i]) {
    //             //    line += '"' + array[i][index] + '",';
    //             // }
    
    //             line.slice(0,line.Length-1); 
    
    //             str += line + '\r\n';
    //         }
    //             return str;
    // }

module.exports = router;