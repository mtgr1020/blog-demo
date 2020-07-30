const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
    const that = this;
    that.status = PENDING;

    function resolve(value) {
        that.status = RESOLVED
    }

    function reject(value) {
        that.status = REJECTED
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}