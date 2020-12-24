# webpack 配置

看过多少变文档，要用的时候还是大脑空白，这里不管是否赘余，记录一下加深下印象吧～

## source-map
```js
module.exports = {
  devtool: 'inline-source-map'
}
```
- source-map

会生成map格式的文件，里面包含映射关系的代码

- inline-source-map

不会生成map格式的文件，包含映射关系的代码会放在打包后生成的代码中

- inline-cheap-source-map

cheap有两种作用：一是将错误只定位到行，不定位到列。二是映射业务代码，不映射loader和第三方库等。
会提升打包构建的速度。

- inline-cheap-module-source-map

module会映射loader和第三方库

- eval

用eval的方式生成映射关系代码，效率和性能最佳。但是当代码复杂时，提示信息可能不精确。