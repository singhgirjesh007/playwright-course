export class DeliveryDetails {

constructor(page){
    this.page = page
   this.firstName  = page.getByPlaceholder('First name')
   this.lastName  = page.getByPlaceholder('Last name')
   this.street  = page.getByPlaceholder('Street')
   this.postalCode  = page.getByPlaceholder('Post code')
   this.city  = page.getByPlaceholder('City')
   this.paymentNav  = page.getByRole('button', { name: 'Continue to payment' })
   this.countryDropdown = page.locator("[data-qa='country-dropdown']")
   this.saveForaddress = page.getByRole('button', { name: 'Save address for next time' })
    this.continueToPayment = page.getByRole('button', { name: 'Continue to payment' })
}


fillDetails = async (userData)=> {
await  this.firstName.waitFor()
await  this.firstName.fill(userData.fname)
await this.lastName.fill(userData.lname)
await this.street.fill("ghjglglllg")
await this.postalCode.fill("90210")
await this.city.fill("Beverly Hills")
await this.countryDropdown.waitFor()
await this.countryDropdown.selectOption('United States of America')
await this.saveForaddress.click()
await this.continueToPayment.waitFor()
await this.continueToPayment.click()

}
}