# npx

npx是一种在npm中安装工具，也可以被单独的下载使用,在npm5.2以后已自动安装了npx

npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！

## 存在的意义

npx 会帮你执行依赖包里的二进制文件，提升开发者使用包内提供的命令行工具的体验

以往我们在node项目中执行一个脚本，需要在script中声明

```js
"scripts": {
  "serve": "vue-cli-service serve --open",
  "build": "vue-cli-service build",
},
```

然后执行命令npm run serve,本质就是执行了vue-cli-service serve --open,有了npx后就无需在script声明了，可以直接在命令行中执行

```js
npx vue-cli-service serve --open
```

是不是感觉幸福感提升了一个丢丢～

## 优点

1. 不再全局安装工具包

如：空文件夹中安装了vue-cli，直接使用npx
```
npx vue init webpack projedct
```

这样我们就在本地安装不同版本的vue-cli,不同的项目vue-cli版本可以不一样，这样是不是优秀的很多呢...

2. 执行一次性命令

当你想尝试一些命令行工具，需要全局安装它但只运行一次,使用npx就能完美解决这个顾虑，即用即拿，用完即走，完全不会污染全局环境

如：使用 npx create-react-app my-cool-new-app 安装一个临时 create-react-app 并调用它，而不用污染全局安装或需要多个步骤。

3. 使用不同版本的node运行命令

使用 npx 的 -p 选项指定安装特定的包，并把它们添加到系统变量中。

```
npx -p node@<version> node -v 
```

### 全局安装的缺点

* 占用本机空间
npm 会在本机创建一个目录存在全局安装的工具，node_module会占用比较大的空间

* 版本问题
加入一个项目有些dependency是全局安装的，那么每个开发人员使用的这个dependency完全取决于他本地的版本，也就导致了不同的开发人员使用不同的版本






