/**
 * 在Promise中有三种状态,先定义出来
 */
const PENDING = "pending";
const RESOLVED = "resolved";
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
        // 当value是 thenale对象时, Promise.resolve会将对象转换成Promise对象
        // 然后立即执行thenable的then方法 还需要优化
        if (typeof value === 'object' && typeof value.then === 'function') {
            return that.then(value.then(resolve))
        }
        // 
        setTimeout(() => {
            that.status = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.forEach(cb => {
                cb(that.value)
            });
        }, 0)

    }
    function reject(value) {
        setTimeout(() => {
            that.status = REJECTED;
            that.value = value;
            that.rejectedCallbacks.forEach(cb => {
                cb(that.value)
            });
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

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(
                    x,
                    y => {
                        resolvePrimise(promise, y, resolve, reject)
                    },
                    e => {
                        reject(e)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (error) {
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
    return new MyPromise((resolve) => {
        resolve(value)
    })
}