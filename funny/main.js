// 计算N的阶乘

// function facttail(n, total = 1){
//     if(n < 0){
//         return 0
//     }else if(n === 0){
//         return 1
//     }else if(n === 1){
//         return total
//     }
//     return facttail(n-1,n*total)
// }

/**
 *  蹦床函数 不断的执行函数 判断函数类型
 *  原函数会一直执行 递归时返回值是一个绑定计算后参数的函数
 *  由蹦床函数去执行 返回结果
 *  颇有循环调用的感觉
 */

// function trampoline(f) {
//     while (f && f instanceof Function) {
//         f = f();
//     }
//     return f;
// }

// const factorial = function (n, total = 1) {
//         if (n === 1) return total;
//         return factorial.bind(null, n - 1, n * total);
// } 

// const n = 50000

// console.log(facttail(n))
// console.log(trampoline(factorial(n)))

function tco(f) {
    var value;
    var active = false;
    var accumulated = [];
    return function accumulator() {
        /**
         * 此处妙哉妙哉
         * 通过闭包定义局部变量存储函数参数
         * 也是记录函数的参数
         * 通过active记录执行开闭
         * 其实是一直在执行一个函数 由于返回时调用了一次函数导致参数被推进accumulated
         * 循环继续执行,知道没有参数结束
         */
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}
var sum = tco(function (x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    } else {
        return x
    }
});

console.log(sum(1, 100000))
