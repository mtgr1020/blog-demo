let products = new Proxy({
    browsers: ['Internet Explorer', 'Netscape']
}, {
    get: function (obj, prop) {
        // 附加一个属性
        if (prop === 'latestBrowser') {
            return obj.browsers[obj.browsers.length - 1];
        }

        // 默认行为是返回属性值
        return obj[prop];
    },
    set: function (obj, prop, value) {
        // 附加属性
        if (prop === 'latestBrowser') {
            obj.browsers.push(value);
            return;
        }

        // 如果不是数组，则进行转换
        if (typeof value === 'string') {
            value = [value];
        }

        // 默认行为是保存属性值
        obj[prop] = value;

        // 表示成功
        return true;
    }
});

console.log(products.browsers); // ['Internet Explorer', 'Netscape']
products.browsers = 'Firefox';  // 如果不小心传入了一个字符串
console.log(products.browsers); // ['Firefox'] <- 也没问题, 得到的依旧是一个数组

products.latestBrowser = 'Chrome';
console.log(products.browsers);      // ['Firefox', 'Chrome']
console.log(products.latestBrowser); // 'Chrome'

let data = { name: { title: 'zhuanzhuan' } }
let p = new Proxy(data, {
    get(target, key) {
        console.log('获取值:', key)
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        console.log('修改值:', key, value)
        return Reflect.set(target, key, value)
    }
})

p.name.title = 'xx'



