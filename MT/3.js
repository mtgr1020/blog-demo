/**
 * let o = {
 *   foo: function() {
 *      console.log('bar');
 *   }
 * }
 * let mo = addSleep(o);
 * mo.sleep(1).foo(); //延迟1秒打印
 */

let o = {
    foo: function () {
        console.log('bar')
    },
    boo: function () {
        console.log('far')
    }
}

function addSleep(obj) {
    function _c() {
        this.stackQueue = []
    }

    let nc = new _c()

    function formatStack(value) {
        return () => {
            nc.stackQueue.push(value)
            return nc
        }
    }
    /**
     * 这的思路就是 不要直接用原型去赋值 原型不知道该怎么推金队列
     * 所以尝试去做一个重新赋值 是不是也可以劫持啊 好主意
     */
    for (let key in obj) {
        _c.prototype[key] = formatStack(obj[key])
    }
    _c.prototype.sleep = function (t) {
        setTimeout(() => {
            this.stackQueue.forEach(item => {
                if (item instanceof Function) {
                    item()
                }
            })
        }, 1e3 * t)
        return this
    }
    return nc
}


let mo = addSleep(o)

mo.sleep(3).foo().boo()