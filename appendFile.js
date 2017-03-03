/**
 * Дописать в конец файла строку
 */

let fs = require('fs');
let fileName = 'test.txt';
let data = 'data to append';

fs.appendFile(fileName, 'data to append', function(err) {
    if (err) {
        console.log('error', err);
    } else {
        console.log('ok');
    }
});