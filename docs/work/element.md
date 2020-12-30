## element-ui 
## 1、el-select 下拉框展示不全

原因：在项目通同时使用到了el-scroll 为了防止出现横向滚动条做了样式处理，造成全局污染
```css
.el-scrollbar__wrap {
  overflow-x: hidden;
} 
```

解决方式：针对el-select组件处理样式
```css
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap   {
  overflow: scroll!important;
}
```
注意：尽量不要放在scoped样式内