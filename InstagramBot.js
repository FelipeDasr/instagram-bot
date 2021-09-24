const randomNumber = require('./utils/randomNumber')
const sleep = require('./utils/sleep')

const puppeteer = require('puppeteer')

class InstagramBot {
    constructor() { }

    init = async () => {
        this.browser = await puppeteer.launch({
            headless: false,

        })
        this.page = await this.browser.newPage()
    }

    login = async (username, password) => {
        await this.page.goto('https://www.instagram.com/')

        await this.page.waitForSelector('[name="username"]')
        await this.page.type('[name="username"]', username)
        await this.page.type('[name="password"]', password)

        await this.page.click('[class="sqdOP  L3NKy   y3zKF     "]')
        await this.page.waitForNavigation()
    }

    enterAUserProfile = async (username = null) => {
        await this.page.goto(`https://www.instagram.com/${username}/`)
    }

    followUser = async (username = null) => {
        if (username) await this.enterAUserProfile(username)

        try {
            // Buttons header
            await this.page.waitForSelector('[class="nZSzR"]')

            // Try to get the follow button
            const followButton = await this.page.$('[class="_5f5mN       jIbKX  _6VtSN     yZn4P   "]')

            if (followButton) {
                await followButton.click()
                return { success: true }
            }

            return { success: false }
        }
        catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    unfollowUser = async (username = null) => {
        if (username) await this.enterAUserProfile(username)

        try {
            // wait for buttons header
            await this.page.waitForSelector('[class="nZSzR"]')

            // get the unfollow button
            const unfollowButton = await this.page.$('[class="_5f5mN    -fzfL     _6VtSN     yZn4P   "]')

            if (unfollowButton) {
                await unfollowButton.click()

                // Confirm unfollow
                await this.page.click('[class="aOOlW -Cab_   "]')
                return { success: true }
            }

            return { success: false }
        }
        catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    //class="CfWVH"

    viewStories = async (username = null) => {
        if (username) await this.enterAUserProfile(username)

        try {
            // Wait for user photo
            await this.page.waitForSelector('[class="RR-M- h5uC0"]')
            // Click on user photo
            await this.page.click('[class="RR-M- h5uC0"]')

            while (true) {
                // Wait few seconds before going to the next story
                await sleep(randomNumber(0.5, 2.5))
                const nextStoryResult = await this.nextStory()
                if (!nextStoryResult.next) {
                    break
                }
            }
            return { success: true }
        }
        catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    viewStory = async(storyUrl) => {
        try{
            await this.page.goto(storyUrl)

            // Confirm view
            await this.page.waitForSelector('[class="sqdOP  L3NKy     y1rQx cB_4K  "]')
            await this.page.click('[class="sqdOP  L3NKy     y1rQx cB_4K  "]')

            await sleep(randomNumber(1, 2.5))
            await this.closeStory()
        }
        catch(e){
            console.log(e)
            return {success: false}
        }
    }

    nextStory = async () => {
        try {
            // Arrow button
            const arrowButton = await this.page.$('[class="coreSpriteRightChevron"]')

            if (arrowButton) {
                arrowButton.click()
                return { next: true }
            }
            return { next: false }
        }
        catch (e) {
            return { success: false }
        }
    }

    closeStory = async () => {
        try{
            // Button
            const closeButton = await this.page.$('[class="aUIsh"] > button')
            if(closeButton) {
                closeButton.click()
                return { success: true }
            }
            return { success: false }
        }
        catch(e){
            console.log(e)
            return { success: false }
        }
    }

    openFirstPhoto = async (username = null) => {
        if (username) await this.enterAUserProfile(username)

        try {
            // wait for first photo
            await this.page.waitForSelector('[class="v1Nh3 kIKUG  _bz0w"]', {
                timeout: 4000
            })
            // Click
            await this.page.click('[class="v1Nh3 kIKUG  _bz0w"]')
            return { success: true }
        } catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    likePhoto = async (photoUrl = null) => {
        if (photoUrl) await this.page.goto(photoUrl)

        try {
            // wait for like button
            await this.page.waitForSelector('[class="fr66n"]')

            await this.page.$eval('[class="fr66n"]', e => {
                const likeIcon = document.querySelector('[class="fr66n"] > button > div > span > svg')

                // checks if it is not clicked
                if (likeIcon.getAttribute('color') !== '#ed4956') {
                    // Like photo
                    document.querySelector('[class="fr66n"] > button').click()
                }
            })
            return { success: true }
        }
        catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    unlikePhoto = async (photoUrl = null) => {
        if (photoUrl) await this.page.goto(photoUrl)

        try {
            // wait for button container
            await this.page.waitForSelector('[class="fr66n"]')
            await this.page.$eval('[class="fr66n"]', e => {
                const likeIcon = document.querySelector('[class="fr66n"] > button > div > span > svg')

                // checks if it is clicked
                if (likeIcon.getAttribute('color') === '#ed4956') {
                    // Unlike photo
                    document.querySelector('[class="fr66n"] > button').click()
                }
            })
            return { success: true }
        }
        catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    nextPhoto = async () => {
        try {
            // wait for next button container
            await this.page.waitForSelector('[class=" _65Bje    coreSpriteRightPaginationArrow"]')
            // Click
            await this.page.click('[class=" _65Bje    coreSpriteRightPaginationArrow"]')
            return { success: true }
        } catch (e) {
            console.log(e)
            return { success: false }
        }
    }

    closePhoto = async () => {
        try {
            // Wait for close button
            await this.page.waitForSelector('[class="                     Igw0E     IwRSH      eGOV_         _4EzTm                                                                                  BI4qX            qJPeX            fm1AK   TxciK yiMZG"]')
            // Click
            await this.page.click('[class="                     Igw0E     IwRSH      eGOV_         _4EzTm                                                                                  BI4qX            qJPeX            fm1AK   TxciK yiMZG"]')
            return { success: true }
        }
        catch (e) {
            console.log(e)
            return { success: false }
        }
    }
}

module.exports = InstagramBot