import {expect} from '@playwright/test'

export class Checkout {

    constructor(page) {
        this.page = page;
        this.basketCard = page.locator("[data-qa='basket-card']")
        this.basketItemPrice = page.locator("[data-qa='basket-item-price']")
        this.basketRemoveButton = page.locator("[data-qa='basket-card-remove-item']")
        this.continueToCheckoutbutton = page.locator("//div[contains(text(),'Continue to Checkout')]")


    }

    removeCheapestProduct = async () => {
        await this.basketCard.first().waitFor()
        await this.basketItemPrice.first().waitFor()

        const itemsBeforeRemoval = await this.basketCard.count()

        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        console.log({ allPriceTexts })
        const priceListInInteger = allPriceTexts.map((itemPrice) => {
            const itemPricewithoutDollar = itemPrice.replace("$", "")
            return parseInt(itemPricewithoutDollar, 10)
        })

        console.log({ priceListInInteger })

        const minimunPriceItem = priceListInInteger.reduce((accumlator, element) => {
            if (element < accumlator) {
                return element
            }
            else {
                return accumlator
            }
        }, priceListInInteger[0])
        const specificRemoveButton = await this.basketRemoveButton.nth(priceListInInteger.indexOf(minimunPriceItem))
        await specificRemoveButton.click()
       // await this.basketCard.first().waitFor()
       // const itemsAfterRemoval = await this.basketCard.count()
        await expect(this.basketCard).toHaveCount((itemsBeforeRemoval - 1))
    }

    continueToCheckout = async ()=>{
       await  this.continueToCheckoutbutton.click()
       await this.page.waitForURL(/\/login/ , {timeout:3000})
    }


}