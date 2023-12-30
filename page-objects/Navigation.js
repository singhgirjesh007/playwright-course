import {isDesktopViewport} from './../Utils/isDesktoViewPort.js'

export class Navigation {

constructor(page){
    this.page=page
    this.basketCounter = page.locator("[data-qa='header-basket-count']")
    this.checkout = page.getByRole('link', {name:'Checkout'})
    this.mobileBurgerButton = page.locator("[data-qa='burger-button']")
}

getBasketCount = async ()=>{
    await this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
}

gotToCheckout = async () => {
  if(!isDesktopViewport(this.page)){
    await this.mobileBurgerButton.waitFor()
    await this.mobileBurgerButton.click()
  }
  await this.checkout.waitFor()
  await this.checkout.click();
  await this.page.waitForURL("/basket")

}
}

