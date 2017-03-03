/**
 * Загрузка нескольких изображений. Обработка окончания загрузки
 */

// let Promise = require("bluebird");
let request = require("request");
let fs = require("fs");
let path = require("path");

let pathImg = 'download';
let imgList = [
    'http://hanguppictures.com/Images/Urban/Banksy-KeepItReal.jpg',
    'http://hanguppictures.com/Images/Urban/Bansky_Girl_With_Balloon.jpg',
    'http://hanguppictures.com/Images/Banksy/banksy-lenin-on-roller-skates.jpg',
    'http://hanguppictures.com/Images/Urban/banksy-paranoid-pictures.jpg',
];

let promiseArr = [];

for (var i = 0, len = imgList.length; i < len; i++) {
    let uri = imgList[i];
    let filename = pathImg + '/' + path.parse(uri).base;

    var promis = new Promise(function(resolve, reject) {
        request.head(uri, function(err, res, body) {
            if (res.statusCode == 200) {
                console.log(res.headers['content-type'], filename);
                request(uri).pipe(fs.createWriteStream(filename)).on('close', function(d) {
                    resolve(); // Проблема
                });
            } else {
                console.log(res.statusCode, filename);
                reject();
            }
        });
    });

    promiseArr.push(promis);
}

fs.mkdir(pathImg, function(e) {
    Promise.all(promiseArr).then(function(d) {
        console.log('success download!'); // Если весь список скачался успешно
    }, function(err) {
        console.log('error');
    });
});