/**
 * 列表的抽象数据类型定义(set??)
 * 
 * listSize(属性)  | 列表元素个数
 * pos(属性)  | 列表的当前位置
 * length(属性)  | 返回列表中元素的个数
 * clear(方法)  | 清空列表中所有元素
 * toString(方法)  | 返回列表字符串形式
 * getElement(方法)  | 返回当前位置的元素
 * insert(方法)  | 在现有元素后插入新元素
 * append(方法)  | 在列表的末尾添加新元素
 * remove(方法)  | 在列表中删除元素
 * front(方法)  | 将列表的当前位置移动到第一个元素
 * end(方法)  | 将列表的当前位置移动到最后一个元素
 * prev(方法)  | 将当前位置前移一位
 * next(方法)  | 将当前位置后移一位
 * hasNext(方法)  | 判断后一位
 * hasPrev(方法)  | 判断前一位
 * currPos(方法)  | 返回列表当前位置
 * moveTo(方法)  | 将当前位置移动到指定位置
 * 
 * 书中基于函数数组来做列表,我们基于ES6和Set来实现一个
 */

 const List = class List{
    dataStore = new Set()
    pos = 0

    get length(){
        return this.dataStore.size
    }
    /**
     * 在现有元素后插入元素
     * @param {Object} element 要拆入的元素 
     * @param {Object} after 现有元素
     */
    insert(element,after){
        const insertPos = this.find(after)
        if(insertPos > -1){
            const parseData = [...this.dataStore]
            parseData.splice(insertPos+1,0,element)
            this.dataStore = new Set(parseData)
        }
        return false
    }
    find(after){
        let parseData  = [...this.dataStore]
        for(let index=0;index<parseData.length;index++){
            if(after === parseData[index] ){
                return index
            }
        }
        return -1
    }
    append(element){
        this.dataStore.add(element)
    }
    toString(){
        console.log(this.dataStore)
    }
    remove(element){
        this.dataStore.delete(element)
    }
    clear(){
        this.dataStore.clear()
    }
    contains(element){
        return this.dataStore.has(element)
    }
    /**
     * 总结pos,hasNext()... 这种就问了遍历而生的
     */
    getElement(){
        return this.dataStore.values()[this.pos] // 这点其实就没有数组方便
    }
 }

module.exports = List


