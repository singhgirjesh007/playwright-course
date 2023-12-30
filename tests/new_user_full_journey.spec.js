import {test} from '@playwright/test'
import { ProductsPage } from './../page-objects/ProductsPage.js'
import {Navigation} from "./../page-objects/Navigation.js"
import {Checkout} from './../page-objects/Checkout.js'
import {LoginPage} from './../page-objects/LoginPage.js'
import {RegisterPage} from "./../page-objects/RegisterPage.js"
import {DeliveryDetails} from "./../page-objects/DeliveryDetails.js"
import {PaymentPage} from './../page-objects/PaymentPage.js'
import {deliveryDetails as userData} from '../Data/deliveryDetails.js'

import { v4 as uuidv4} from 'uuid'

test('New user full journey', async ({page})=>{
    //launch application url : localhost:221 to work on this test
    const productsPage = new ProductsPage(page)
    
    await productsPage.visit();
    await productsPage.sortByCheapest();
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    const navigation = new Navigation(page)
    await navigation.gotToCheckout()
    

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const loginPage = new LoginPage(page)
    loginPage.goToSignupPage()

    const registerPage = new RegisterPage(page)
    //generate email from uuid generator unique every time
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await page.waitForTimeout(500)
    await registerPage.signUpAsNewUser(email,password)
    
    await page.waitForTimeout(2000)
    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userData)

    const paymentpage = new PaymentPage(page)
    await paymentpage.finalpay()
    
    

})