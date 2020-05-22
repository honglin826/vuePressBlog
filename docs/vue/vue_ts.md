# vue + ts

## SFC 单 vue 文件组件的基本结构

```vue
<template>
  <!-- 结构示例，指令基础用法同vue -->
  <div>
    <span>{{ selfKey1 }}</span>
    <ul>
      <li :key="item" v-for="item in fatherKey">{{ item }}</li>
    </ul>
    <button @click="addCount">加一</button>
    <AnotherVue
      :class="['default-class', selfKey1.length > 10 ? 'one' : 'two']"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from "vue-property-decorator";
  import { Route } from "vue-router";
  import AnotherVue from "@/components/AnotherVue.vue";
  @Component({
    // 组件注册
    components: {
      AnotherVue
      // 'another-vue': AnotherVue
    },
    // 过滤器
    filters: {
      filterFn1() {}
    },
    // 父子传值1
    props: {
      hideHeader: {
        type: Boolean,
        required: false,
        default: false // 默认属性的默认值
      }
    }
  })
  export default class ComponentName extends Vue {
    // 父子传值2
    @Prop({
      type: Boolean,
      required: false,
      default: false // 默认属性的默认值
    })
    private hideHeader!: boolean | undefined
    // 父子传值3
    @Prop() private header: string[] // 其他没有默认值的传值
    // 内部属性值
    count: number = 1
    // 生命周期
    created() {}
    mounted() {}
    // 计算属性
    get computedCount() {
      return this.count;
    }
    // 监听器
    @Watch("computedCount")
    getComputedCount(newVal) {
      console.log(newVal)
    }
    // 导航守卫函数
    private beforeRouteEnter(to: Route, from: Route, next: () => void): void {
      console.log("beforeRouteEnter", to, from, next);
      next();
    }
    // 方法
    addCount() {
      this.count += 1
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/demo.scss";
</style>
```

## Component 中使用filters过滤器

```vue
<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  @Component({
    filters: {
      filterValue(value) {
        return Number(value).toLocaleString();
      }
      // otherFilterFn(value) { 其他filter示例
      //   return ...
      // }
    },
    components: {}
  })
  export default class Container extends Vue {
    // ...
  }
</script>
```

## Watch 监听 store 中的数据改变

```vue
<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
get stateSomeKey() { // 计算属性
  // 监听state下的stateSomeKey对象中的keyName属性，return返回该值
  return this.$store.state.stateSomeKey.keyName
}
@Watch('stateSomeKey')
getstateSomeKey(val) {
  // 监听到变化后，执行对应的内容
  this.myFunction()
  ...
}
</script>
```

## Watch 监听 router 的变化

1、main.ts中注册路由导航守卫

```ts
// main.ts
import { Component } from "vue-class-component";
Component.registerHooks([
  "beforeRouteEnter", //进入路由之前
  "beforeRouteLeave" //离开路由之前
])
```

2、组件中监听路由钩子

```vue
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import { Route, RawLocation } from 'vue-router'
  // 1、监听路由变化
  @Watch('$route',{ immediate: true })
  private changeRouter(route: Route){
    console.log(route)
  }

  // 2、定义路由钩子函数
  private beforeRouteEnter(to: Route, from: Route, next: () => void): void {
    console.log('beforeRouteEnter', to, from, next)
    next()
  }
  private beforeRouteLeave(to: Route, from: Route, next: () => void): void {
    console.log('beforeRouteLeave')
    next()
  }
</script>
```

## 项目使用 echart

1、main.ts 中注册并使用

```ts
// 引用
import ECharts from "vue-echarts"
// 用到的模块要单独引用
import "echarts/lib/chart/line" // 线图为例，其他图一样
import "echarts/lib/component/title.js" // 标题
import "echarts/lib/component/legend" // 图例
import "echarts/lib/component/tooltip" // 提示框
import "echarts/lib/component/toolbox" // 工具（如下载功能与按钮）

// 注册
Vue.component("v-chart", ECharts)
```

2、vue.config.js 中设置

```js
// vue.config.js
module.exports = {
  // For Vue CLI 3+, add vue-echarts and resize-detector into transpileDependencies in vue.config.js like this:
  transpileDependencies: ["vue-echarts", "resize-detector"]
}
```

3、tsconfig.js也要设置

```js
// tsconfig.json
{
  "compilerOptions": {
    "types": ["webpack-env", "echarts"]
  }
}
```

4、组件内正常引用

```js
<v-chart :options="echartsOptions" id="myCharts" ref="myCharts" />
```


## 项目使用 element-ui

1、main.ts 中注册使用

```js
// main.ts
import ElementUI from "element-ui";
Vue.use(ElementUI);

/* 在全局注册v-loading使用  */
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
```
2、tsconfig.js 中配置

```js
{
  "compilerOptions": {
    "types": ["webpack-env", "element-ui/types"]
  }
}
```

## 全局scss 变量

在 assets/styles 下新建_variable.scss 文件，用于存放 scss 变量
然后再 vue.config.js 中设置全局变量

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variable.scss"
        `
      }
    }
  }
}
```

## alias 别名设置

