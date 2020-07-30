if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then((registration) => {
        console.log('service worker 注册成功')
    }).catch(err => {
        console.log('servcie worker 注册失败')
    })
}

console.log('vi')