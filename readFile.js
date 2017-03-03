/**
 * Прочитать текстовый файл
 */

let fs = require('fs');
let fileName = "packagesss.json";

fs.readFile(fileName, "utf-8", function(err, data) {
    if (err) {
        if (err.code == 'ENOENT') {
            console.log("No such file or directory");
        } else {
            console.log("error", err);
        }

        return;
    };

    console.log(data);
});