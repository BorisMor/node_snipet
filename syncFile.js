var fs = require("fs");

// Проверить существование каталога
if (!fs.existsSync("temp")) {
    fs.mkdirSync("temp"); // Создали каталог
}

var tempDir = fs.mkdtempSync("temp/tmp-"); // Временный каталог

var workFile = tempDir + '/test.txt';
fs.writeFileSync(workFile, "Hello word"); // Записали в файл в текст
fs.appendFileSync(workFile, "!!!"); // Добавили в конец файла
var content = fs.readFileSync(workFile, 'utf8'); // Полностью прочитать содержимое файла

// Информация по файлу
var inf = fs.lstatSync(workFile);
inf.isDirectory() ? console.log("это директориая") : undefined;
inf.isFile() ? console.log("это файл") : undefined;
console.log("Создан: ", inf.birthtime);
console.log("Последнее обращение: ", inf.atime);
console.log("Последнее изменение: ", inf.mtime);

fs.renameSync(workFile, tempDir + '/test999.txt'); // Переименовать файл

var listDir = fs.readdirSync("temp/"); // Список каталогов
for (var i = 0, len = listDir.length; i < len; i++) {
    tempDir = "temp/" + listDir[i] + "/";

    listFile = fs.readdirSync(tempDir);
    for (numFile in listFile) {
        var temFile = tempDir + listFile[numFile];
        fs.unlinkSync(temFile); // Удалили файл
    }

    fs.rmdirSync(tempDir); // Удалили каталог
}