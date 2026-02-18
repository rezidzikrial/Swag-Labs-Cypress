class CheckoutStepOne { 

    titleCo(){
        return cy.get('.title')
    }

    inputFirstName(){
        return cy.get('#first-name')
    }

    typeFirstName(firstName){
        this.inputFirstName().clear()

        if(firstName && firstName.length > 0){
            this.inputFirstName().type(firstName)
        }
    }

    inputLastName(){
        return cy.get('#last-name')
    }

    typeLastName(lastName){
        this.inputLastName().clear()

        if(lastName && lastName.length > 0){
            this.inputLastName().type(lastName)
        }
    }

    inputCodeZip(){
        return cy.get('#postal-code')
    }

    typeCodeZip(codeZip){
        this.inputCodeZip().clear()

        if(codeZip && codeZip.length > 0){
            this.inputCodeZip().type(codeZip)
        }
    }

    cancelCoButton(){
        return cy.get('#cancel')
    }

    continueCoButton(){
        return cy.get('#continue')
    }

    verifyInputForm(){
        cy.get('.title').should('be.visible').should('have.text', 'Checkout: Overview')
        cy.url().should('include', 'checkout-step-two')
        
    }
    

}

export default CheckoutStepOne