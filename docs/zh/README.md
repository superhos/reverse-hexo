# 逆转 Hexo

[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Introduction
我的博客基于hexo在Github上部署。 良好的平台和良好的博客框架。 直到去年年底我失去了我的电脑。 我发现在GitHub存储库中只会保存生成后的代码。 
这意味着我博客的帖子的源代码是丢失了。 太难过了随意难以继续写博客。 所以我花了半年的时间休息，没有更新我的博客。 但现在，我意识到一个伟人不会被打败的。 我可以失去代码，但我不能失去自己。 于是我积极地去寻找一种工具，一种可以将hexo生成的代码转换为帖子的源代码的工具。 可惜没有找到合适的，所以我决定自己写。 
最后希望你不会经历我的痛苦和失落。

一句话总结:
*这是一个把hexo生成代码转换成源码的工具*.

## Getting Started

```bash
npm install -g reverse-hexo
```

### How To Use

1. 建立一个新的Hexo项目。
2. 把Hexo生成的代码下载到 `public` 文件夹中.
3. 使用下面命令:
```bash
reverse-hexo /User/xxx/hexo-blog/root/path
```
4. 执行后再执行:
```bash
hexo g
hexo d
```
5. 完成

## Running the tests

检查网页。

## Built With

* [h2m](https://www.npmjs.com/package/h2m) - Tool for converting HTML to Markdow
* [cheerio](https://www.npmjs.com/package/cheerio/) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.


## Contributing


## Version

1.0.0 实现基本功能.

## Authors

* **SevensChan** - *Personal Website* - [陈昊太帅了](http://www.chenhaotaishuaile.com/)

## License

MIT

