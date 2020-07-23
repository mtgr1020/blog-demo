// new Promise(resolve => {
//     resolve(1);
//     Promise.resolve({
//         then: function (resolve, reject) {
//             console.log(2);
//             resolve(3)
//         }
//     }).then(t => console.log(t))
//     console.log(4);
// }).then(t => console.log(t));
// console.log(5);
//控制台输出：45213
//下面按照最开始的理解，将上述代码进行转换
new Promise(resolve => {
    resolve(1);
    new Promise(resolve => {
        console.log(2);
        resolve(3)
    }).then((t) => console.log(t));
    console.log(4);
}).then(t => console.log(t));
console.log(5);