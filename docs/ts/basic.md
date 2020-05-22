---
sidebarDepth: 2
collapsable: true
---

# TS

## 1.ts是什么

> ts是微软公司开发的一款开源的编程语言，遵循最新的JS规范，扩展了Javascript语法，是Javascript的超集。

> TS提供的类型系统可以帮助我们在写代码的时候提供更丰富的语法提示

> 在创建前的编译阶段经过类型系统的检查，就可以避免很多线上的错误

> 详情请移步ts中文文档: [ts中文文档](https://www.tslang.cn/docs/home.html)

## 2.ts的安装和编译

```ts
// 安装
npm i typescript -g
// 编译
tsc helloWorld.ts
```
### 生成ts 配置文件
```js
tsc --init
```
```json
// tsconfig.js
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",
    "module": "commonjs",
    "lib": []
  }
}
```

### vscode运行

#### ts-node
它提供了TypeScript的运行环境，让我们免去了麻烦的编译这一步骤,让vscode直接加载并运行ts文件

```ts
Terminal->Run Task-> tsc:build // 编译
Terminal->Run Task-> tsc:watch // 编译并监听
```

## 3.基础数据类型

[以下基础demo请移步github](https://github.com/honglin826/ts-demo)

TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

> 注意：类型首字母不能大写

### 3.1 布尔值boolean
```ts
let isShow: boolean = false
```
### 3.2 数字number
```ts
let age: number = 10
```
### 3.3 字符串string
```ts
let name: string = 'lin'
```
### 3.4 数组array
```ts
let arr1: number[] = [1, 3, 5]
let arr2: Array<string> = ['3', '6', '9']
```
### 3.5 元组tuple

元组（ Tuple ）表示一个已知数量和类型的数组

> 场景：学生信息

```ts
let student: [string, number] = ['zhangsan', 10]
student[0].length // 可调用string的方法
studnet[1].toFixed(2) // 可调用number的方法
```
#### 3.5.1数组VS元组

|元组|数组|
|---|---|
|每一项可以是不同的类型|每一项都是同一种类型|
|有预定的长度|没有长度限制|
|用于表示一个固定的结构|用于表示一个列表|

### 3.6 枚举enum

事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值

> 场景：性别、月份、星期、颜色

#### 3.6.1普通枚举
```ts
// 默认从0开始
enum Gender{
  GIRL,
  BOY
}
// 编译成es5
// var Gender;
// (function (Gender) {
//     Gender[Gender["GIRL"] = 0] = "GIRL";
//     Gender[Gender["BOY"] = 1] = "BOY";
// })(Gender || (Gender = {}));
// 指定映射值
enum Week {
  MONDAY= 1,
  TUESDAY= 2,
  FRIDAY= 5
}
console.log(`Today is ${Week[2]}`)
```
#### 3.6.1常数枚举

* 关键字 const
* 它在编译阶段被删除
* 不能包含计算成员，会在编译阶段报错

```ts
const enum Colors {
  Red=1,
  Yellow,
  Blue
}
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue]

// 编译阶段报错
// const enum member initializers can only contain literal values and other computed enum values
const enum Color {Red, Yellow, Blue = "blue".length}
```
### 3.7 任意类型any

* any可以赋值给任意类型
* 第三方库没有提供类型文件时可以使用any
* 类型转换困难时
* 数据结构太复杂难以定义时

### 3.8 null和undefined

* null 和 undefined 是其它类型的子类型，可以赋值给其它类型，赋值后的类型会变成 null 或 undefined
* 严格空检查模式strictNullChecks下只能赋值给自己或者any

```ts
let x: number
x = 1
x = undefined  
x = null

let y: number | null | undefined;
y = 1
y = undefined
y = null
```
### 3.9 void

* 表示没有任何类型
* 常用语没有任何返回值的函数的返回值

```ts
function sayHello(name: string): void {
  console.log(name)
}
```
### 3.10 never

* 永远无法达到的值

```ts
function whileLoop(): never {
  while(1) {
    // do something
  }
}
```
```ts
// Compiled with --strictNullChecks
function fn(x: number | string) {
  if (typeof x === 'number') {
    // x: number 类型
  } else if (typeof x === 'string') {
    // x: string 类型
  } else {
    // x: never 类型,永远执行不到这里
  }
}
```
#### 3.10.1 never VS void

|void|never|
|---|---|
|值为空，可以被赋值为null和undefined的类型|永远无法达到的值|
|void返回值函数能正常运行|never返回值的函数无法终止或抛出异常|

### 3.11 联合类型

* 值可以取多种类型中的一种
* 未赋值时联合类型上能访问几个类型共有的属性和方法，赋值后正常使用

```ts
let stu: string | number

stu = 'zhangsan'
console.log(stu.length)

stu = 12
stu.toFixed(2)
```

### 3.12 类型断言

* 类型断言可以将一个联合类型的变量，指定为一个更加具体的类型

```ts
let someValue: string | number
// "尖括号" 语法
let strLength: number = (<string>someValue).length;
// as 语法
let strLength1: number = (someValue as string).length;

let someObj: object
let isShow: boolean = (someValue as any).isShow
```

### 3.13 字面量类型

* 可以把字符串、数字、布尔值字面量组成一个联合类型

```ts
type tType = 'one' | 1 | true
let t1: tType = 'one'
let t2: tType = 1
let t3: tType = true
```
#### 3.13.1 字面量 VS 联合类型

|字面量|联合类型|
|---|---|
|取值为约定值中的一个|取值为多种类型中的一种|

## 4.函数
### 4.1 函数定义

* 指定参数的类型和返回值的类型

```ts
function sayHello(name: string): void {
  console.log('hello', name)
}
```

### 4.2定义函数类型

```ts
type getNameType = (x: string, y: string) => string
let getName: getNameType = function(firstName, lastName) {
  return firstName + lastName
}
```

### 4.3 没有返回值

```ts
function sayHello(name: string): void {
  console.log('hello', name)
  // return undefined
}
```
### 4.4 可选参数

* 可选参数必须是最后一个参数
* 多个可选参数时形参和实参必须一样

```ts
// ? 表示可选
function getStu(name: string, age?: number): void {
  console.log(name, age)
}
```
### 4.5 默认参数

```ts
function getStu(name: string, age: number = 10): void {
  console.log(name, age)
}
```
### 4.6 函数重载

* 给同一个函数提供多个函数类型定义

```ts
let obj: any = {}
function getObj(val1: string, val2: string): void
function getObj(val1: number, val2: number): void
function getObj(val1: string | number, val2: string | number ): void {
  if (typeof val1 === 'string' && typeof val2 === 'string') {
    console.log(val1, val2)
  } else if (typeof val1 === 'number' && typeof val2 === 'number') {
    console.log(val1, val2)
  } else {
    // 无法达到的结果
    console.log(val1, val2)
  }
}
```

## 5.类
### 5.1 类的定义

```ts
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return "Hello, " + this.greeting
  }
}

let greeter = new Greeter("world")
```

### 5.2 类的继承

* 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
* 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
* super可以调用父类上的方法和属性

```ts
class Person {
    name: string
    age: number
    constructor(name:string,age:number) {
        this.name=name
        this.age=age
    }
    getName():string {
        return this.name
    }
    setName(name:string): void{
        this.name=name
    }
}
// 子类继承
class Student extends Person{
    no: number
    constructor(name:string,age:number,no:number) {
        super(name,age)
        this.no=no
    }
    getNo():number {
        return this.no
    }
}
let s1=new Student('zhangsan',10,1)
```
### 5.3 类的修饰符

```ts
class Father {
    public name: string  //(默认值)类里面 子类 其它任何地方外边都可以访问
    public readonly gender
    protected age: number //类里面 子类 都可以访问,其它任何地方不能访问
    private money: number //类里面可以访问， 子类和其它任何地方都不可以访问
    constructor(name:string,age:number,money:number) {
      this.name=name
      this.age=age
      this.money=money
    }
    getName():string {
      return this.name
    }
    setName(name:string): void{
      this.name=name
    }
}
class Child extends Father{
    constructor(name:string,age:number,money:number) {
      super(name,age,money)
    }
    desc() {
      //Property 'money' is private and only accessible within class 'Father'.
      console.log(`${this.name} ${this.age} ${this.money}`)
    }
}
```

## 6.装饰器
* 装饰器是一种特殊的类型声明，它能够被附加到类声明、方法、属性或者参数上，可以修改类的行为
* 常见的装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器

### 6.1 类装饰器
* 在类声明之前，用来监视、修改或替换类定义

```ts
// 这里的接口用来定义stu有name、doSomething属性方法，随后介绍接口
interface Student {
  name: string,
  doSomething: any
}
/**
 * @param target 目标类
 */
function enhancer(target: any) {
  target.prototype.name = 'zhangsan'
  target.prototype.doSomething = function () {
    console.log('doSomething')
  }
}
// 类装饰器
@enhancer
class Student {
  constructor() {}
}

let stu: Student = new Student()
console.log(stu.name)
stu.doSomething()
```

### 6.2 属性装饰器
* 在类属性声明之前，用来监视、修改或替换类属性

```ts
/**
 * 属性装饰器
 * @param target 目标类
 * @param propertyKey 属性名称
 */
function upperCase (target: any, propertyKey: string) {
  let value = target[propertyKey]
  const getter = function () {
    return value
  }
  const setter = function (newValue: string) {
    value = newValue.toUpperCase()
  }
  if (delete target[propertyKey]) {
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}
class Student {
  // 类属性装饰器
  @upperCase
  name: string = 'zhangsan'
  constructor () {}
  getName() {
    console.log(this.name)
  }
}

let stu: Student = new Student()
stu.name = 'zhangsan'
stu.getName()
```

### 6.3 方法装饰器
* 在类方法声明之前，用来监视、修改或替换类方法

```ts
/**
 * 方法装饰器
 * @param target 目标类
 * @param property 方法名称
 * @param descriptor 方法描述符
 */
function toNumber (target: any, property: string, descriptor: PropertyDescriptor) {
  let method = descriptor.value
  descriptor.value = function (...args: any[]) {
    args = args.map(item => parseFloat(item))
    return method.apply(this, args)
  }
}
class Student {
  name: string = 'zhangsan'
  constructor () {}
  getName() {
    console.log(this.name)
  }
  // 类方法装饰器
  @toNumber
  sum(...args: any) {
    return args.reduce((accu: number, item: number) => accu + item, 0)
  }
}

let stu: Student = new Student()
console.log(stu.sum('1', '2', '3'))
```

### 6.4 参数装饰器
* 在类参数声明之前，用来监视、修改或替换类参数

```ts
interface Student {
  age: number
}
/**
 * 参数装饰器
 * @param target 目标类
 * @param methodName  方法名称
 * @param paramsIndex  参数下标
 */
function addAge(target: any, methodName: string, paramsIndex: number) {
  target.age = 10
}
class Student {
  login(username: string, @addAge password: string) {
    console.log(this.age, username, password)
  }
}
let stu: Student = new Student()
stu.login('zhangsan', '123456')
```

### 6.5 各类装饰器执行顺序

* 多个参数装饰器时，从最后一个参数依次向前执行
* 方法和属性装饰器，谁在前边谁先执行
* 类装饰器总是最后执行

### 6.6 装饰器工厂

* 如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

```ts
interface Student {
  name: string,
  doSomething: any
}
/**
 * 装饰器工厂
 */
function enhancer(value: string) {
  return function (target: any) {
    target.prototype.name = value
    target.prototype.doSomething = function () {
      console.log('doSomething')
    }
  }
}
// 类装饰器
@enhancer
class Student {
  constructor() {}
}

let stu: Student = new Student()
```

### 6.7 装饰器组合

```ts
// 写在一行
@f @g class a {}
// 换行
@f
@g
class a {}
```
组合装饰器的执行顺序

1、非装饰器工厂模式，由下至上依次调用

2、装饰器工厂模式

* 由上至下依次对装饰器表达式求值
* 求值的结果会被当作函数，由下至上依次调用

```ts
function f() {
  console.log("f(): evaluated")
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("f(): called")
  }
}

function g() {
  console.log("g(): evaluated")
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("g(): called")
  }
}

class C {
  @f()
  @g()
  method() {}
}
// 执行： f(g(x))
// 输出
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called
```

## 7.接口

* 接口可以用来描述对象的形状，还可以在面向对象编程中表示为行为的抽象
* 接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类

#### 7.1 初探

```ts
// 接口用来描述对象的形状，少属性或者多属性都会报错
// 接口中每一项既可以用逗号分割，也可以什么都不加
interface Student {
  name: string,
  age?: number, // ?表示可选属性，1、对可能存在的属性进行预定义，2、捕获引用了不存在的属性时的错误
  doSomething(): void,
  // readonly school: string, // 只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写
  // [propName: string]: any // 无法预先知道有哪些新的属性的时候
}
let stu: Student = {
  name: 'zhangsan',
  doSomething() {}
}
```
### 7.2 接口的继承

* 一个接口可以继承自另外一个接口

```ts
interface Speakable {
  speak(): void
}
interface Eatable {
  eat(): void
}
interface SpeakChinese extends Speakable {
  speakChinese(): void
}
interface SpeakEnglish extends Speakable, Eatable {
  speakChinese(): void
}
class Person implements SpeakChinese {
  speak() {
      console.log('Person')
  }
  speakChinese() {
      console.log('speakChinese')
  }
}
```

### 7.3 函数类型的接口

* 对传入函数的参数和返回值进行约束

```ts
interface discount{
  (price:number):number
}
let cost:discount = function(price:number):number{
  return price * .8
}
```

### 7.4 可索引的接口

* 描述那些能够“通过索引得到”的类型，如数组和对象
* 描述了索引的类型，和相应的索引返回值类型。

```ts
interface Interface1 {
  [index: number]: string
}
interface Interface2 {
  [index: string]: string
}

let arr: Interface1 = ['abc', 'cde']
let obj: Interface2 = {
  name: 'zhangsan',
  gender: 'male'
}
```

### 7.5 类接口

* 对类的约束

```ts
interface Speakable {
  name: string
  speak(words: string): void
}
class Dog implements Speakable {
  name!: string
  speak(words:string) {
    console.log(words)
  }
}
let dog = new Dog()
dog.speak('汪汪汪')
```

## 8.泛型

* 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

### 8.1 泛型函数

先看一个简单的函数
```ts
function createArray(length: number, value: any): Array<any> {
  let result: any = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
let result = createArray(3,'x')
```
使用泛型后,数组的类型就可以在调用的时候去定义

```ts
// 可定义默认泛型
function createArray<T=number>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
      result[i] = value
    }
    return result
  }
let result = createArray2<string>(3,'x')
```

### 8.2 泛型类

```ts
class MyArray<T>{
  private list:T[]=[]
  add(value:T) {
    this.list.push(value)
  }
  getMax():T {
    let result=this.list[0]
    for (let i=0;i<this.list.length;i++){
      if (this.list[i]>result) {
        result=this.list[i]
      }
    }
    return result
  }
}
```

### 8.3 泛型接口

1、定义接口的时候指定泛型

```ts
interface Calculate<T>{
  list: T[]
}
let abc: Calculate<{name: string, age: number}> = {
  list: [
    {
      name: 'zhangsan',
      age: 23
    }
  ]
}
```
2、泛型接口用来约束函数
```ts
interface Calculate{
<T>(a:T,b:T):T
}
let add:Calculate = function<T>(a:T,b:T){
  return a
}
console.log(add<number>(1,2))
```

### 8.4 多个泛型
```ts
function swap<A,B>(tuple:[A,B]):[B,A]{
  return [tuple[1],tuple[0]]
}
let swapped = swap<string,number>(['a',1])
```

### 泛型类型别名
* 复杂的泛型类型可以命名泛型别名
```ts
type Cart<T> = {list:T[]} | T[]
let c1:Cart<string> = {list:['1']}
let c2:Cart<number> = [1]
```
#### 泛型接口 VS 泛型类型别名
|泛型接口|泛型别名|
|--|--|
|创建一个新的名字|并不创建新的名字|
|可以被extends和implements|不可以|

## 9.类型兼容性

* 如果传入的变量和声明的类型不匹配时，TS就会进行兼容性检查，原理是Duck-Check，就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的。

### 9.1 基本类型的兼容

```ts
let num : string|number
let str:string='beijing'
num = str
```
### 9.2 接口的兼容性
* 目标类型属性只能多不能少
```ts
interface Animal {
  name: string;
  age: number;
}

interface Person {
  name: string;
  age: number;
  gender: number;
}
// 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal: Animal): string {
  return animal.name;
}
let p: Person = {
  name: 'zhangsan',
  age: 10,
  gender: 0
}

getName(p);
```

### 9.3 类的兼容性
* 目标类的属性只能多了可以，少了不可以
```ts
class Animal{
  name:string
}
// Bird 比Animal 属性多不可以
class Bird extends Animal{
  swing:number
}
let a:Animal
a = new Bird()
let b:Bird
b = new Animal() // 报错

// 父子结构相同，可以
class Tiger extends Animal {}
let ani:Animal
ani = new Tiger()
let bni: Tiger
bni = new Animal()
```

### 9.4 函数的兼容性
* 比较函数的时候是要先比较函数的参数，再比较函数的返回值
#### 9.4.1 比较参数
* 目标类型参数少了可以，多了不行
```ts
type sumFunc = (a:number,b:number)=>number
let sum:sumFunc
function f1(a:number,b:number):number{
  return a+b
}
sum = f1
//可以省略一个参数
function f2(a:number):number{
  return a
}
sum = f2
//多一个参数报错
function f3(a:number,b:number,c:number){
    return a+b+c
}
sum = f3 // 报错
```
#### 9.4.1 比较返回值
* 目标类型返回值多了可以，少了不行
```ts
type GetPerson = ()=>{name:string,age:number}
let getPerson:GetPerson
//返回值一样可以
function g1(){
    return {name:'zhangsan',age:10}
}
getPerson = g1;
//返回值多一个属性也可以
function g2(){
    return {name:'zhangsan',age:10,gender:'male'}
}
getPerson = g2;
//返回值少一个属性可不行
function g3(){
    return {name:'zhangsan'}
}
getPerson = g3
```

### 9.5 泛型的兼容性
```ts
//1.接口内容为空没用到泛型的时候是可以的
interface Empty<T>{}
let x!:Empty<string>
let y!:Empty<number>
x = y

//2.接口内容不为空的时候不可以
interface NotEmpty<T>{
  data:T
}
let x1!:NotEmpty<string>
let y1!:NotEmpty<number>
x1 = y1 // 有具体的类型被使用到，报错
```

### 9.6 枚举的兼容性
* 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
* 不同枚举类型之间是不兼容的
```ts
//数字可以赋给枚举
enum Colors {Red,Yellow}
let c:Colors
c = Colors.Red
c = 1
c = '1'

//枚举值可以赋给数字
let n:number
n = 1
n = Colors.Red
```

## 10.类型保护

### 10.1 typeof类型保护

```ts
function double(input: string | number | boolean) {
  if (typeof input === 'string') {
    return input + input
  } else {
    if (typeof input === 'number') {
      return input * 2
    } else {
      return !input
    }
  }
}
```

### 10.2 instanceof类型保护

```ts
class Animal {
    name!: string
}
class Bird extends Animal {
  swing!: number
}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal.swing)
  } else {
    console.log(animal.name)
  }
}
```

### 10.3 null保护

* 如果开启了strictNullChecks选项，那么对于可能为null的变量不能调用它上面的方法和属性

```ts
function getFirstLetter(s: string | null) {
  //第一种方式是加上null判断
  if (s == null) {
    return ''
  }
  //第二种处理是增加一个或的处理
  s = s || ''
  return s.charAt(0)
}
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
    function log() {
        console.log(s!.trim())
    }
    s = s || ''
    log()
    return s.charAt(0)
}
```

### 10.4 in 操作符

* in 运算符可以被用于参数类型的判断

```ts
interface Bird {
    swing: number
}

interface Dog {
    leg: number
}

function getNumber(x: Bird | Dog) {
    if ("swing" in x) {
      return x.swing
    }
    return x.leg
}
```

## 11 类型声明
* 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
* 类型声明在编译的时候都会被删除，不会影响真正的代码

### 11.1 类型声明文件

* 我们可以把类型声明放在一个单独的类型声明文件中
* 文件命名规范为*.d.ts, 如：jquery.d.ts
* JS中有很多内置对象，可以在TS中当作声明好的类型使用，详情可以查阅[Ts核心库的声明文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)


### 11.1 普通类型声明
[声明规范](https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html)
```ts
declare let name: string;  //变量
declare let age: number;  //变量
declare function getName(): string;  //方法
declare class Animal { name: string }  //类
```

### 11.3 自己编写声明文件并配置ts.config
<!-- * [模块查找规则](https://www.tslang.cn/docs/handbook/module-resolution.html) -->

```ts
declare global {
  // 声明全局变量类型
  interface Window {
    axios: any;
    mCall: {
      getVersion: Function; // 获取版本
      getDeviceId: Function; // 获取设备Id
    };
    myLib(a: string): string;
  }
}
declare module 'qs' // 声明第三方模块
```

* tsconfig.json 中，我们通过 compilerOptions 里的 paths 属性来配置路径映射
* 如果配置了paths,那么在引入包的的时候会自动去paths目录里找类型声明文件
```json
"paths": {
  "@/*": [
    "src/*"
  ]
},
```

### 11.4 第三方库的声明文件

* 库的npm 包里已经包含了声明文件
* npm 去下载声明文件，通常@types/包名

如：获取lodash库的声明文件，只需使用下面的命令：
```ts
npm install --save @types/lodash
```
下载完后，就可以直接在TypeScript里使用lodash了。 不论是在模块里还是全局代码里使用。

## 12.tsconfig.json配置文件

* 给出部分配置项的注释，供参考

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. 指定ECMAScript的目标版本*/
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 指定模块代码的生成方式*/
    // "lib": [],                             /* Specify library files to be included in the compilation. 指定编译的时候用来包含的编译文件*/
    // "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译JS文件*/
    // "checkJs": true,                       /* Report errors in .js files. 在JS中包括错误*/
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定JSX代码的生成方式 是保留还是react-native或者react*/
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. ts编译后会丢失类型声明，可以生成相应的类型声明文件 */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. 为每个类型声明文件生成相应的sourcemap*/
    "sourceMap": false,                     /* Generates corresponding '.map' file. 生成对应的map文件 */
    // "outFile": "./",                       /* Concatenate and emit output to single file. 合并并且把编译后的内容输出 到一个文件里*/
    // "outDir": "./",                        /* Redirect output structure to the directory.按原始结构输出到目标目录 */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 指定输入文件的根目录，用--outDir来控制输出的目录结构*/
    // "composite": true,                     /* Enable project compilation 启用项目编译*/
    // "removeComments": true,                /* Do not emit comments to output. 移除注释*/
    // "noEmit": true,                        /* Do not emit outputs. 不要输出*/
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. 当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule').r把每一个文件转译成一个单独的模块 */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. 启用完全的严格类型检查 */
    "noImplicitAny": false,                 /* Raise error on expressions and declarations with an implied 'any' type. 不能使用隐式的any类型*/
    "strictNullChecks": true,              /* Enable strict null checks. 启用严格的NULL检查,null和undefined只能赋值给void和它们各自*/
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. 启用严格的函数类型检查*/
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions.启用函数上严格的bind call 和apply方法 */
    "strictPropertyInitialization": false,  /* Enable strict checking of property initialization in classes. 启用类上初始化属性检查*/
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type.在默认的any中调用 this表达式报错 */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. 在严格模式下解析并且向每个源文件中发射use strict*/

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用到的本地变量时报错 */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用到的参数时报错*/
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 当不是所有的代码路径都有返回值的时候报错*/
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 在switch表达式中没有替代的case会报错 */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). 指定模块的解析策略 node classic*/
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. 在解析非绝对路径模块名的时候的基准路径*/
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. 一些路径的集合*/
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. 根目录的列表，在运行时用来合并内容*/
    // "typeRoots": [],                       /* List of folders to include type definitions from. 用来包含类型声明的文件夹列表*/
    // "types": [],                           /* Type declaration files to be included in compilation.在编译的时候被包含的类型声明 */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking.当没有默认导出的时候允许默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
    //"esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.*/
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks.不要symlinks解析的真正路径 */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. 指定ts文件位置*/
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. 指定 map文件存放的位置 */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. 源文件和sourcemap 文件在同一文件中，而不是把map文件放在一个单独的文件里*/
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. 源文件和sourcemap 文件在同一文件中*/

    /* Experimental Options */
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启动装饰器*/
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. 为带有装饰器的声明生成元数据 */

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,  /* Disallow inconsistently-cased references to the same file. */

    "types": [
      "webpack-env",
      "jest"
    ],
    "baseUrl": "/",
    "paths": { // 自定义类型声明文件
      "@/*": [
        "src/*"
      ]
    },
    // 类型声明文件库
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules"
  ]
}
```