import {expect} from '@playwright/test'

export class PaymentPage {


    constructor(page) {
            this.page = page
            this.frameLoc = page.frameLocator("[data-qa='active-discount-container']")
            this.submitDiscount = page.locator("//div[contains(text(),'Submit dis')]")
            this.discountActivated = page.locator("//p[contains(text(),'Discount activated!')]")
            this.owner  = page.locator("//input[@placeholder='Credit card owner']")
            this.cardNummber  =page.locator("//input[@placeholder='Credit card number']")
            this.validity  =page.locator("//input[@placeholder='Valid until']")
            this.cvc  =page.locator("//input[@placeholder='Credit card CVC']")
            this.paymentLink  =page.locator("//div[contains(text(),'Pay')]")

    }

    finalpay = async ()=>{

        await this.frameLoc.locator("[data-qa='discount-code']").waitFor()
        const text = await this.frameLoc.locator("[data-qa='discount-code']").innerText()
        console.log(text)
        await this.page.locator("[data-qa='discount-code-input']").fill(text)
        await this.page.waitForTimeout(1000)
        await this.submitDiscount.waitFor()
        await this.submitDiscount.click()
        await this.discountActivated.waitFor()
        await expect(this.discountActivated).toHaveText("Discount activated!")
        await  this.owner.waitFor()
        await this.owner.fill("Girjesh kumar")
        await this.cardNummber.fill("1234567891234567")
        await this.validity.fill("09/26")
        await this.cvc.fill("456")
        await this.paymentLink.click()
        


    }
}