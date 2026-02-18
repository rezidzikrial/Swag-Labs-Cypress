// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import CheckoutStepOne from "../PageObjects/checkoutStep1";
import Login from "../PageObjects/loginPage";

Cypress.Commands.add('loginPOM', (username, password) => {

    const loginPage = new Login()

       loginPage.typeUsername(username)
       loginPage.typePassword(password)
       loginPage.clickLogin()
})


Cypress.Commands.add('topBarValidate', () => {
    cy.get("#react-burger-menu-btn").should('be.visible').and('exist')
    cy.get(".app_logo").should('be.visible').and('exist')
    Cypress.pageInventory.cartLink()

})

Cypress.Commands.add('footBarValidate', () => {
    cy.get(".footer").should('be.visible').and('exist')
    cy.get(".social>li").should('be.visible').and('exist').should('have.length', '3')
    cy.get(".footer_copy").should('be.visible').and('exist').should('contain.text', '© 2026')
})

Cypress.Commands.add('inputFormCo', (firstName, lastName, codeZip) => {

    const coForm = new CheckoutStepOne()

       coForm.typeFirstName(firstName)
       coForm.typeLastName(lastName)
       coForm.typeCodeZip(codeZip)
    //    coForm.continueCoButton().click()
})


