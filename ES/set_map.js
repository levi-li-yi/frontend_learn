// Set是一种叫做集合的数据结构
// 集合：是一堆无序的、相关联的，且不重复的内存结构【元素】组成的组合。


// Map是一种叫做字典的数据结构
// 字典：是一些元素的集合，每一个元素有一个称为key的域，不同元素的key各不相同

// 相同点：集合、字典都可以存储不重复的值
// 不同点：集合是以[值, 值]的形式存储元素，字典是以[键，值]的形式存储


// Set 示例：new Set([iterable]) 接收一个数组,或具有iterable接口的对象
// Set允许存储任何类型的唯一值，无论原始值或对象引用

const demoSet = new Set([1,2,1,2]) // {1,2}
// size获取长度
const lenSet = demoSet.size
console.log(lenSet);
// add向集合添加
demoSet.add(3)
// delete从集合删除
demoSet.delete(1)
// has判断是否存在
demoSet.has(2)
// clear移除集合中的所有项
// demoSet.clear()

// keys()：返回键名遍历器
console.log('键名',demoSet.keys(), Array.from(demoSet.keys()));
// values(): 返回键值遍历器
console.log('键值',demoSet.values(), Array.from(demoSet.values()));
// entries(): 返回键值对遍历器
console.log('键名',demoSet.values(), Array.from(demoSet.values()));
// forEach: 遍历每个成员
demoSet.forEach((item) => console.log(item))

// 使用场景：

// 1、数组去重
const arr = [1,2,2,3,4,5]
const unique = [... new Set(arr)];
console.log(unique);

// 2、两集合元素关系
const a = new Set([1,2,3,3,4,5])
const b = new Set([1,3,6,7])

// 并集
const union = [... new Set([...a, ...b])]
console.log(union);

// 交集
const interse = [... new Set([...a].filter((a) => b.has(a)))]
console.log(interse);

// 差集
const difference = [... new Set([...a].filter(a => !b.has(a)))]
console.log(difference);

/// WeakSet: 由弱引用对象组成的集合，操作方法和属性和Set一样， 但没有遍历方法
// 弱引用：无法保证其引用的对象不被垃圾回收器回收的引用


// Map示例：new Map([iterable]),接收一个数组，或其他具有iterable接口的对象
const demoMap = new Map();

//size获取长度
const lenMap = demoMap.size
console.log(lenMap);

// set(key,value):向字典加入或更新
demoMap.set('id', '9527');

// get(key):读取key值对应的值
const id = demoMap.get('id');
console.log(id);

// has(key): 判断是否存在
console.log(demoMap.has('name'));

//delete(key): 删除某个值
demoMap.delete('id');

// clear():清空Map
// demoMap.clear()

// 遍历方法：
//  keys()/values()/entries()/forEach()


/// WeakMap: 由弱引用作为键所组成的字典
// 特点：1、WeakMap的键只能是对象；2、WeakMap键名所指的对象，不计入垃圾回收机制
// WeakMap的属性和操作方法和Map一样，但是五点遍历