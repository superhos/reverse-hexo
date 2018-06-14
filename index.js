#! /usr/bin/env node
const ReverseTools = require('./lib/reverse'); 
const fs = require('fs');

if (process.argv.length !== 3){
    console.log('Usage: reverse-hexo <hexo Root Path>');
    process.exit();
}

var path = process.argv[2];
if (!fs.existsSync(path)){
    console.log('Path Not Exist.');
    process.exit();
}
//"/Users/chenhao/Documents/work/sevensblog"
var tool = new ReverseTools(path);
tool.startReverse();
