module.exports = (min = 1, max) => {
    return Math.random() * (max - min + 1) + min
}