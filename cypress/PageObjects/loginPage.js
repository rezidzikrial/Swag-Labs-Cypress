class Login { 

    tagUsername = "#user-name";
    tagPassword = "#password";
    loginButton = "#login-button";
    errMsg = "h3[data-test='error']";


    setUsername () {
        return cy.get(this.tagUsername).should('be.visible').should('exist')
    }

    typeUsername(username) {
        this.setUsername().clear()
        
        if(username && username.length > 0) {
            this.setUsername().type(username)
        }
        
    }

    setPassword () {
        return cy.get(this.tagPassword).should('be.visible').should('exist')
    }

    typePassword(password) {
        this.setPassword().clear()

        if(password && password.length > 0){
            this.setPassword().type(password)
        }
    }

    clickLogin () {
        return cy.get(this.loginButton).should('be.visible').should('exist').click()
    }

    verifyLogin () {
        cy.get('.shopping_cart_link').should('be.visible')
        cy.get('#logout_sidebar_link').should('exist')
        cy.url('include', '/inventory')
    }

    logoutButton() {
        cy.get("#react-burger-menu-btn").click()
        cy.get('#logout_sidebar_link').should('be.visible').and('have.text', 'Logout').click()
    }

    login (username, password) {
        this.setUsername().clear().type(username)
        this.setPassword().clear().type(password)
        this.clickLogin()
        
    }
}
export default Login