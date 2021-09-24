module.exports = (time) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Wake up')
    }, time * 1000)
})