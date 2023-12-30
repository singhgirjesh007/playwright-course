

export class RegisterPage {

    constructor(page){

        this.page= page
        this.emailLoc = page.getByPlaceholder('E-Mail')
        this.passwordLoc= page.getByPlaceholder('Password')
        this.registerLink = page.getByRole('button', { name: 'Register' })
        
    }

    signUpAsNewUser = async (email,password)=>{
        await this.emailLoc.waitFor()
        await this.emailLoc.fill(email)
        await this.passwordLoc.fill(password)
        await this.registerLink.click();


    }




}