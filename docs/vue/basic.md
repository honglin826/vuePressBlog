# vue 常用小技巧

## Object.defineProperty()

* 1、Vue的响应式是对对象类型的既有属性进行监听，无法监测新属性，若对对象增加新属性将不会进行重新渲染

解决方案

```js
// 1、$set()
// 原理：调用defineReactive(ob.value, key, val)
this.$set(obj, 'newItem', 'new')
// Object.assign()
// 直接使用Object.assign()添加到对象的新属性不会触发更新
// 应创建一个新的对象，合并原对象和混入对象的属性
this.obj = Object.assign({}, this.obj, {
  newItem: 'new'
})
```