const InstagramBot = require('./InstagramBot')
const sleep = require('./utils/sleep')

const settings = require('./settings')

const main = async () => {
    
    const bot = new InstagramBot()

    await bot.init()
    await bot.login(settings[0].username, settings[0].password)

    await bot.enterAUserProfile('github')

    await bot.followUser()

    await bot.openFirstPhoto()

    await bot.likePhoto()

    await bot.nextPhoto()

    await bot.closePhoto()

    await bot.unfollowUser()
}

main()