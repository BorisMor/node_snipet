/**
 * Создаем новый текстовый файл или перезаписывает существующий
 */


let fs = require('fs');
let fileName = 'test.txt';
let data = 'Is test file';

fs.writeFile(fileName, data, function(err) {
    if (err) {
        console.log('error', err);
        return;
    }

    console.log('It\'s saved!');
});