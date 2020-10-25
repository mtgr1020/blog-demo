const array = [0, 0, 246, 1, 1, 1, 1, 2, 3, 3, 5, 6, 6, 7, 7, 8, 9, 10, 21, 23, 42, 45, 49, 53, 67, 234, 246, 246, 246, 246]
console.time()
let count = 0
let l = 0
let n = array.length - 1
for (let i = 0; i < array.length - 1; i++) {
    let m = n
    for (let j = 0; j < m; j++) {
        if (array[j] > array[j + 1]) {
            l++
            [array[j], array[j + 1]] = [array[j + 1], array[j]]
            // n = j
        }
        count++
    }
    if (l == 0) {
        break
    }
    l = 0
}
console.log('count: ' + count)
console.log(array)
console.timeEnd()
/**
 * 冒泡排序的优化
 * 第一点优化 l来记录前后交换的次数,当不存在次数时说明后边都是有序的不需要在循环了
 * 第二点优化 记录最后交换的坐标
 */