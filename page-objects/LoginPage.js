import {expect} from '@playwright/test'

export class LoginPage {

    constructor(page) {
        this.page = page
        this.signuplink = page.locator("[data-qa='go-to-signup-button']")
    }


    goToSignupPage = async ()=>{
        await this.signuplink.waitFor()
        await this.signuplink.click()
        await this.page.waitForURL(/\/signup/)
        await expect(this.page).toHaveURL(/\/signup/ , {timeout : 3000})
    }

}