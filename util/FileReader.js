const fs = require("fs");

const cwd = process.cwd();

const readFile = function(fileName){
  const data = fs.readFileSync(cwd+fileName);
  console.log(data);
}

module.exports = {
  readFile
}