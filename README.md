# Reverse Hexo

[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

[中文文档](/docs/zh/README.md)

## Introduction
My blog deploys on Github base on hexo. Good platform and good blog framework. Until I lose my computer at the end of the last year. I found that the generated code store in GitHub repository only. That means the source code of the posts were Lost. Too upset to continue writing blogs. So I take a half of year break with no update on my blog. But now, I realized that a great man cannot be beaten. I can lose the code but I cannot lose myself. I look for a tool which can transform the hexo's generated code to the posts' markdown source code. No suitable tool so I write it by myself. I hope you will not experience my pain and loss.


In a word:
*This is a tool which can transform the hexo's generated code to the source code*.

## Getting Started

```bash
npm install -g reverse-hexo
```

### How To Use

1. Build a novel hexo project.
2. Pull down the generated code form github and copy to `public` folder.
3. Command:
```bash
reverse-hexo /User/xxx/hexo-blog/root/path
```
4. After running:
```bash
hexo g
hexo d
```
5. Done

## Running the tests

Check the website.

## Built With

* [h2m](https://www.npmjs.com/package/h2m) - Tool for converting HTML to Markdow
* [cheerio](https://www.npmjs.com/package/cheerio/) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.


## Contributing


## Version

1.0.0 Implement default function.

## Authors

* **SevensChan** - *Personal Website* - [AwesomeSevens](http://www.awesomesevens.com/)

## License

MIT

