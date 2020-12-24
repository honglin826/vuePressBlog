# node

## path.resolve() VS path.join()

### path.resolve

把一个路径或路径片段解析为一个绝对路径，相当于cd
给定的路径的序列是 "从右往左" 被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。

```js
let myPath = path.resolve(__dirname,'/img/so');
let myPath2 = path.resolve(__dirname,'./img/so');
let myPath3=path.resolve('/foo/bar', './baz');
let myPath4=path.resolve('/foo/bar', '/tmp/file/');
 
console.log(__dirname);      // \test
console.log(myPath);    // \img\so
console.log(myPath2);   // \test\img\so
console.log(myPath3);   // \foo\bar\baz
console.log(myPath4);   // \tmp\file
```

### path.join

将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。

```js
const path = require('path');
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3=path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
 
 
console.log(__dirname);      // \test  
console.log(myPath);    // \test\img\so
console.log(myPath2);   // \test\img\so
console.log(myPath3);   // \foo\bar\baz\asdf
```