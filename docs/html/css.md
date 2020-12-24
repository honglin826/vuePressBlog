# CSS

## 那些常用但是记不住的css神技

```css

// 禁止长按图片保存
img {
  -webkit-touch-callout: none;
  pointer-events: none; // 像微信浏览器还是无法禁止，加上这行样式即可
}
* {
  // 禁止长按选择文字
  -webkit-user-select: none;
  // 禁止长按呼出菜单
  -webkit-touch-callout: none;
  // 去除小灰快
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

// 自定义浏览器滚动条
.scrollBar() {
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 8px;
    background-color: lighten(#46A0FC, 25%);
  }
}

```