/**
 * 使用commonjs模式引入,浏览器端运行请注意
 */

 const List = require('./List')

 const listInstance  = new List()

 console.log(listInstance)

 // 插入一个元素
 listInstance.append('hi list1')
 listInstance.append('hi list2')
 listInstance.append('hi list3')
 listInstance.insert('hi list4','hi list1')
  listInstance.insert('hi list5','hi list2')
  listInstance.insert('hi list6','hi list3')
 console.log(listInstance.length)
 listInstance.toString()

 // 在列表中删除元素
listInstance.remove('hi list2')
console.log(listInstance.length)
 listInstance.toString()

 // 判断元素是否在列表中
 console.log(listInstance.contains('hi list1'))
 console.log(listInstance.contains('hi list2'))

 // clear清空所有的元素
 listInstance.clear()
 console.log(listInstance.length)
 listInstance.toString()