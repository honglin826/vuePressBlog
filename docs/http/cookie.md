# cookie - session

## 存在的历史原因

http是无状态的，本身不保存用户的状态信息，通过引入cookie和session体系机制来维护状态信息。

## cookie

- 不能跨域(仅限域名)，每个cookie都会绑定单一的域名，不能在不同的域名下用。

### 属性

- name

- value

- comment

该Cookie的用处说明。浏览器显示Cookie信息的时候显示该说明

- domain cookie绑定的域名

统一个域名下的二级域名也是不可以交换使用cookie的

- path

- Expires / Max-Age

Cookie失效的时间，单位秒。

  Max-Age > 0 生存时间
          < 0 临时存储，关闭浏览器失效
          = 0 删除

- secure

当这个属性设置为true时，此cookie只会在https和ssl等安全协议下传输

- httpOnly

如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击


### js操作cookie

```js
//读取浏览器中的cookie
console.log(document.cookie)
//写入cookie
document.cookie='myname=laihuamin;path=/;domain=.baidu.com'
```

## session

VS: 服务端用来保存状态的值

当客户端请求创建一个session的时候，服务器会先检查这个客户端的请求里是否已包含了一个session标识 - sessionId，

- 如果已包含这个sessionId，则说明以前已经为此客户端创建过session，服务器就按照sessionId把这个session检索出来使用（如果检索不到，可能会新建一个）
如果客户端请求不包含sessionId，则为此客户端创建一个session并且生成一个与此session相关联的sessionId

- sessionId的值一般是一个既不会重复，又不容易被仿造的字符串，这个sessionId将被在本次响应中返回给客户端保存。保存sessionId的方式大多情况下用的是cookie。

