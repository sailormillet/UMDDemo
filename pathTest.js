const path = require("path");
const commonDir =  path.resolve(__dirname);
var staticFileDir = path.resolve(commonDir, '../static');
var staticFileDir2 = path.resolve(__dirname, '../static');
console.log(commonDir)
console.log(__dirname)
console.log(staticFileDir)
console.log(staticFileDir2)