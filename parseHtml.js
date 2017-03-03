/**
 * Запросить страницу и распарсить
 */

let request = require('request');
let cheerio = require('cheerio')

var url = "https://yandex.ru/images/search?text=%D0%BE%D1%82%D0%BF%D1%83%D1%81%D0%BA&nl=1"
request(url, function(error, response, body) {
    if (error) {
        console.error("Ошибка", error);
        return;
    }

    var $ = cheerio.load(body);
    var res = $(".serp-item__thumb");

    // console.log(res);
    for (var i = 0, len = res.length; i < len; i++) {
        let s = res[i].attribs.src;
        console.log(s);
    }
});