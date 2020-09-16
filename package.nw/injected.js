const fs = require('fs');

console.log(fs);

printer = {};

printer.print = function() {
    console.log(process.versions['node-webkit']);

    window.print({
        printer: 'CUSTOM_Engineering_TG2480-H',
        headerFooterEnabled: false
    });
    
};

//printer.print();




