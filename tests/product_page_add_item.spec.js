import { test,expect } from "@playwright/test"

test.skip("Product Page Add to Basket" , async ({page}) => {

    await page.goto("/")
  //  await page.pause()
    const addToBasketButton= page.locator("[data-qa='product-button']").first()
    const basketCounter = page.locator("[data-qa='header-basket-count']")
    await expect(basketCounter).toHaveText("0")
    await addToBasketButton.waitFor()
    await addToBasketButton.click()

    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")

    const checkOutLink = page.locator("//a[contains(text(),'Checkout')]").nth(1)
    await checkOutLink.waitFor()
    await checkOutLink.click()
    await page.waitForURL("/basket")


    page.pause()

})