# npm 一些常用命令

## npm audix

允许开发人员分析复杂的代码，并查明特定的漏洞和缺陷。

## npm audix fix

检测项目依赖中的漏洞并自动安装需要更新的有漏洞的依赖，而不必再自己进行跟踪和修复


## 常见报错解决方案

项目安装依赖报错cb() never called!是npm 自身的原因，看网上大部分的解决方案是卸载npm重装，好粗暴呀，找了个比较好的方式，清npm缓存呀，亲测好用。

```js
sudo npm cache verify
// otherwise
sudo npm cache clean
```