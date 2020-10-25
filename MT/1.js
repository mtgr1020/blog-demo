var a = 1;

var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function () {
        console.log('c', a);
        var a = 2;  // 改成let输出啥
    },
    d: function () {
        console.log(0);
        setTimeout(_ => console.log(1));
        new Promise(resolve => {
            resolve();
            console.log(2);
        }).then(_ => {
            console.log(3);
        });
        console.log(4)
    }
}

obj.d();
obj.c();
obj.b();

// 0  4    'c' undefined  undefined window 3 1