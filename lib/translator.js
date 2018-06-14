/**
 * translator for Hexo.
 **/
const cheerio = require('cheerio')
const he = require('he')
const fs = require('fs')

var translator = function(){
	
} 

translator.prototype = {
	translate: function(str){
		//处理代码块
		str = this.handleCodeBlock(str);
		return str;
	},
	decode: function(str){
		var strs = str.match(/&#x(.*?);/g);
 		for (var i in strs){
 			str = str.replace(strs[i],strs[i].replace(/&#x/g,'%u').replace(/;/g,''));
 		}
 		return unescape(str);
 	},
	handleCodeBlock: function(str){

		//清理h1-6之间的a
		str = str.replace(/(?<=(\<h{1,6}.*\>)).+(?=\<\/a\>)/g,'');

		const $ = cheerio.load(str);
		var figures = $("figure");
		if (figures.length > 0){
				for (var i = 0 ; i < figures.length ; i ++){
					var _this = $(figures.get(i));
					var langType = _this.attr("class").replace('highlight ','');
					if (langType !== undefined){
						var codeBlock = _this.find("table td:last-child").html();//.replace(/<[^>]*>/g,''))).replace(/&apos/g,"'");
						var html = this.decode(_this.html());//.replace('<tbody>','').replace('</tbody>','');
						str = str.replace(html,'```'+langType + '\n' + codeBlock.replace(/\&amp;/g,'&').replace(/&apos;/g,"'") + '\n```\n');
					}
				}
		}
		
		return str;
	}
}

module.exports = translator;

 