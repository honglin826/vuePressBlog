module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
      es6: true
    },
    extends: [
      'plugin:vue/essential',
      'standard'
    ],
    plugins: [
      'vue'
    ],
    rules:{
      "no-new": 0,//禁止在使用new构造一个实例后不赋值
      "no-new-func": 0,//禁止使用new Function
    },
    globals:{
      FormViewer:false,
      l:false,
      fabric:false
    }
  }
  