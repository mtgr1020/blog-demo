/**
 * 设计获取用户信息的方法，单例模式
 */

// 抓住重点就完了 单例 就一个实例

const User = (function () {
    var instance;

    function UserInfo() {
        console.log('new UserInfo')
    }

    function getInstance() {
        if (instance === undefined) {
            instance = new UserInfo()
        }
        return instance
    }

    return {
        getInstance
    }
})()

User.getInstance()

var singletonAccepter = (function () {
    var instance = null;

    function SupposeClass(args) {
        var args = args || {};
        this.name = args.name || 'Monkey';
        this.age = args.age || 24;
        console.log('this is created!')
    }
    SupposeClass.prototype = {
        constructor: SupposeClass,
        displayInfo: function () {
            console.log('name:' + this.name + ' age:' + this.age);
        }
    };

    return {
        name: 'SupposeClass',
        getInstance: function (args) {
            if (instance === null) {
                instance = new SupposeClass(args);
            }
            return instance;
        }
    };

})();

var a = singletonAccepter.getInstance();
var b = singletonAccepter.getInstance();
a.displayInfo();
console.log(a === b);


