# HTML

## 常用meta
```html
<!-- 忽略浏览器自动识别数字为电话号码 -->
<meta name="format-detection" content="telephone=no">
<!-- 忽略浏览器自动识别邮箱账号 -->
<meta name="format-detection" content="email=no">
```

## 遇到的一些问题

* position:fixed没定锁定位置的时候

元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

* ISO webview中调用Geolocation API，可能导致https环境无法加http图片

IOS系统的webview还有navigator.geolocation.getCurrentPosition在非完全https站点（网站有http请求的图片）失效的问题。

参考链接:
WebKit on iOS ignores trigger(‘click’) on file input

解决办法：
首先，由于H5服务这套业务逻辑，是不可以然让所有的业务服务器支持https的，因为有的服务是客户自己定制的。
所以只有在H5服务上用nginx做图片代理, 即业务访问的图片http://b.com/zbpb/api/getfile.do?path=duty/image/reduce/a.jpeg可以通过https://h5.lezhiyun.com/image-proxy?url=http://b.com/zbpb/api/getfile.do?path=duty/image/reduce/a.jpeg来访问。