/**
 * 在Promise中有三种状态,先定义出来
 */
const PENDING = "pending";
const RESOLVED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
    const that = this;
    that.status = PENDING; // 状态
    that.value = null;     // resolve、reject 传入的值
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];
    // cb执行有可能会抛出异常
    function resolve(value) {
        // 当resolve接收到一个Promise对象时会返回这个对象
        if (value instanceof MyPromise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            // 判断状态防止重复向回调数组中添加
            if (that.status === PENDING) {
                that.status = RESOLVED;
                that.value = value;
                that.resolvedCallbacks.forEach(cb => {
                    cb(that.value)
                });
            }
        }, 0)

    }
    function reject(value) {
        setTimeout(() => {
            if (that.status === PENDING) {
                that.status = REJECTED;
                that.value = value;
                that.rejectedCallbacks.forEach(cb => {
                    cb(that.value)
                });
            }
        }, 0)
    }
    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e)
    }

}

function resolvePrimise(promise, x, resolve, reject) {
    /**
     * 防止循环引用问题
     */
    if (promise === x) {
        const error = new TypeError('Chaining cycle detected for promise #<MyPromise>')
        return reject(error)
    }
    let called = false; // 避免多次调用
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePrimise(promise, y, resolve, reject)
                    },
                    e => {
                        if (called) return;
                        called = true;
                        reject(e)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }
    } else {
        resolve(x)
    }

}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const that = this;
    // onFulfilled是函数不做处理 当不是函数的时候需要返回当前的值
    // 细节就是 比如 Promise.resolve('test').then(a=1) 里面a=1也会执行
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => {
        onFulfilled
        return v
    }
    onRejected = typeof onRejected === 'function' ? onRejected : error => {
        throw error
    }

    if (that.status === PENDING) {
        return promise = new MyPromise((resolve, reject) => {
            that.resolvedCallbacks.push(() => {
                try {
                    const x = onFulfilled(that.value);
                    resolvePrimise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            });
            that.rejectedCallbacks.push(() => {
                try {
                    const x = onRejected(that.value);
                    resolvePrimise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            });
        })
    }

    if (that.status === RESOLVED) {
        return promise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onFulfilled(that.value)
                    resolvePrimise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }

            })
        })

    }

    if (that.status === REJECTED) {
        onRejected(that.value)
    }
}

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

MyPromise.resolve = function (value) {
    /**
     * 当使用 Promise.resolve() 一个Promise的时候会返回这个实例
     * var original = Promise.resolve(33);
     * var cast = Promise.resolve(original);
     * cast.then(function(value) {
     *   console.log('value: ' + value);
     * });
     * console.log('original === cast ? ' + (original === cast));
     * 
     * 结果
     * original === cast ? true
     * value: 33
     * */
    if (value instanceof MyPromise) {
        return value
    }
    /* 当value是 thenale对象时, Promise.resolve会将对象转换成Promise对象
    * 然后立即执行thenable的then方法 
    * 目前这么写有个执行顺序的问题 then里面的方法正常应落后与平台任务
    */
    if (typeof value === 'object' && typeof value.then === 'function') {
        return new MyPromise(value.then)
    }
    return new MyPromise((resolve) => {
        resolve(value)
    })
}

MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason)
    })
}
/**
  * 在Promise all 当检测到对象不存在iterator会返回一个Promise对象
  * 当对象没有捕获错误时会抛出(未实现) 捕获会执行reject
  */
MyPromise.all = function (promises) {

    if (typeof promises[Symbol.iterator] !== 'function') {
        return MyPromise.reject(
            new TypeError('object is not iterable (cannot read property Symbol(Symbol.iterator))')
        )
    }

    return new MyPromise((resolve, reject) => {
        const len = promises.length;
        const values = new Array(len);
        promises.forEach((promise, index) => {
            if (promise instanceof MyPromise) {
                promise.then((value) => {
                    values[index] = value;
                    index === (len - 1) && resolve(values)
                }, reject)
            } else {
                values[index] = promise;
                index === (len - 1) && resolve(values)
            }

        })
    })

}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(resolve, reject);
        });
    });
}