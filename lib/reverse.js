/**
 * Author: Sevens
 *
 **/
const fs = require("fs")  
const path = require("path")  
const h2m = require('h2m');
const cheerio = require('cheerio')
const translator = require('./translator')
const copy = require('quickly-copy-file');
const urlExists = require('url-exists');

var ReverseTools = function(path){
	this.targetPath = path;
	this.destPath = this.targetPath + '/source/_posts/';
	this.filePath = this.targetPath + '/public';
	this.postYeadDir = [];
	this.postList = [];
}

ReverseTools.prototype = {
 	startReverse: function(){
 		var root = path.join(this.filePath);
 		this.readDirSync(false,root);
 		for (var i in this.postYeadDir){
 			this.readDirSync(true,this.postYeadDir[i]);
 		}
 		//开始转换
 		for (var j in this.postList){
 			var markdownData = this.reverse(this.postList[j]);
		 }
		 
		 console.log('Reverse Successfully. Thanks for Using!');
 	},
 	reverse: function(path){
 		var htmlData = fs.readFileSync(path);

 		var markdownContent = "---\n";

 		//Get Meta data
 		const $ = cheerio.load(htmlData);

 		var title = $('meta[property="og:title"]').attr("content");
 		var tags = $('meta[name="keywords"]').attr('content');
 		var paths = path.split('/');
 		var fileName = paths[paths.length - 2] + '.md';
 		var date = paths[paths.length - 5] + '-' + paths[paths.length - 4] + '-' + paths[paths.length - 3] + ' 00:00:00';

 		markdownContent += 'title: ' + title + '\n';
 		markdownContent += 'date: ' + date + '\n';
 		markdownContent += 'tags: ' + (tags === undefined?"":tags) + "\n";
 		markdownContent += "---\n";

 		var markdown = h2m(new translator().translate(this.decode($('article').html())));

 		markdownContent += this.decode(markdown);
		
		//get img
		markdownContent = this.handleImage(fileName.replace(/\.md/g,''),markdownContent);	

		this.saveFile(fileName,markdownContent);
	 },
	//检测是否有图片
	 handleImage: function(dir,content){
		var _this = this;
		var imgs = content.match(/\!\[.*\]\(.*\)/g);
		var img,fp,imgName;

		var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
		for (var i in imgs){
			img = imgs[i].match(/\((.+?)\)/g)[0].substring(1);
			img = img.substring(0,img.length-1);
			//判断是否是网络图片
			urlExists(img, function(err, exists) {
				if (!exists){
					if (!fs.existsSync(_this.destPath + dir)) {
						fs.mkdirSync(_this.destPath + dir);
					}
			
					img = img.substring(1);
					fp = img.indexOf('/');
					img = _this.filePath + img.substring(fp);
					imgName = img.substring(img.lastIndexOf('/'));
					copy(img, _this.destPath + dir + '/' + imgName);
				}
			});
		}
		return content;
	},
 	decode: function(str){
		 var strs = str.match(/&#x(.*?);/g);
 		for (var i in strs){
 			str = str.replace(strs[i],strs[i].replace(/&#x/g,'%u').replace(/;/g,''));
 		}
 		return unescape(str);//unescape(str.replace(/&#x/g,'%u').replace(/;/g,''));
 	},
 	saveFile: function(fileName,data){
 		fs.writeFileSync(this.destPath + fileName , data);
 	},
 	readDirSync: function(findHtmlMode,path){
 		var pa = fs.readdirSync(path);  
 		var _this = this;
	    pa.forEach(function(ele,index){  
	        var info = fs.statSync(path+"/"+ele)      
	        if(info.isDirectory()){  
	            if (findHtmlMode){
	            	_this.readDirSync(findHtmlMode,path+"/"+ele); 
	            }else{
	            	if (!isNaN(ele)){
		            	_this.postYeadDir.push(path+"/" + ele);
		            }
	            }
	        }else{
	        	if (findHtmlMode && ele.indexOf('.html') > -1){
		            _this.postList.push(path + '/' + ele);
	        	}  
	        }     
	    })  
 	}
}

module.exports = ReverseTools;