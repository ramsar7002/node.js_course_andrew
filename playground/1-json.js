const fs = require("fs");
// const { json } = require("stream/consumers");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);

// fs.writeFileSync("1-json.json", bookJSON);

// const booksBuffer = fs.readFileSync("1-json.json");
// const dataJSON = booksBuffer;
// console.log(JSON.parse(booksBuffer));
const buffer = fs.readFileSync("1-json2.json");
const str = buffer.toString();
const objectData = JSON.parse(str);
console.log(objectData);
objectData.name = "Ram";
console.log(objectData);
fs.writeFileSync("1-json2.json", JSON.stringify(objectData));
