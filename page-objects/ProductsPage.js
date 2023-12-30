import {test,expect} from "@playwright/test"
import {Navigation} from "./Navigation.js"
import {isDesktopViewport} from './../Utils/isDesktoViewPort.js'


export class ProductsPage {
    constructor(page){
        this.page = page;
        this.addButton = page.locator("[data-qa='product-button']")
        this.selectorDropdow = page.locator("//select[@class='sort-dropdown']")

    }

    visit = async ()=>{
        await this.page.goto("/")

    }

    addProductToBasket = async (index)=> {
        const nav= new Navigation(this.page)
        const specificAddButton = this.addButton.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        let basketCountBeforeAdding
        if(isDesktopViewport(this.page)){
            basketCountBeforeAdding = await nav.getBasketCount()
        }
       // console.log(basketCountBeforeAdding )
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket")  
        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await nav.getBasketCount() 
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
        
    }

    sortByCheapest = async ()=> {

        await this.selectorDropdow.selectOption('Price ascending')

    }

}