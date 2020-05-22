# webpack

1. url-loader 

在vue项目里使用vant或者element-ui组件库上线后会出现个别用户icon不展示的情况，对，不是全都不展示，这可能是webpack打包的问题。

url-loader: 文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL（base64）,减少Http请求
.limit: 指定最小限制

注：webpack在打包时会对组件库的字体图标进行打包，如果limit太小webpack就不会对其进行转换，至于具体为啥至于极个别用户无法请求到字体图标，为啥不进行转换就请求不到还没找到合理的解释，问题就这么解决了。