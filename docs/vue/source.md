# vue源码中的一些原理

## nextTick

```js
// 1、vue将dom更新重新渲染的函数放到队列里
// 2、用户每次调用nextTick都会将回掉函数依次放入队列里
// 3、将队列里的任务放入微任务或宏任务里执行，具体看浏览器兼容性(Promise -> MutationObserver -> setImmediate -> setTimeout)
let callback = []
function flushCallback() {
  callback.forEach(cb => cb())
}
export function nextTick(cb) {
  callback.push(cb)

  let Func = () => {
    flushCallback()
  }

  if (Promise) { // 如果浏览器支持Promise, 微任务
    return new Promise.resolve().then(Func)
  }
  if (MutationObserver) { // 微任务
    let observe = new MutationObserver(Func)
    let textNode = observe.createTextNode(1)
    observe.observe(textNode,{characterData:true})
    textNode.textContent = 2 // 这里改变后执行Func
    return
  }

  if (setImmediate) { // 宏任务
    return setImmediate(Func)
  }

  setTimeout(Func, 0) // 以上都不支持的话走setTimeout, 宏任务

}
```