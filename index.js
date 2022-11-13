const me = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(111)
            resolve('111')
        }, 1000);
    })
}
me().then(() => {
    console.log(2222)
})