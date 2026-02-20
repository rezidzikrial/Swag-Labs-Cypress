class CompleteCo{

    titleComplete(){
        return cy.get('.title')
    }

    pageComplete(){
        return cy.get('#checkout_complete_container')
    }

    completeImg(){
        return cy.get("img[alt='Pony Express']")
    }

    completeMsg(){
        return cy.get(".complete-header")
    }

    completeText(){
        return cy.get('.complete-text')
    }

    backHomeButton(){
        return cy.get('#back-to-products')
    }

}
export default CompleteCo