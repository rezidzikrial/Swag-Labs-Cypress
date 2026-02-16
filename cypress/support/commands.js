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
import Login from "../PageObjects/loginPage";

Cypress.Commands.add('loginPOM', (username, password) => {

    const loginPage = new Login()

        // loginPage.login(username, password)

        // if(username && username.length > 0) {
        //     loginPage.typeUsername(username)     
        // }else{
        //     loginPage.typeUsername(username)
        // }

        // if(password && password.length > 0) {
        //     loginPage.typePassword(password)
        // }else{
        //     loginPage.typePassword(password)
        // }

       loginPage.typeUsername(username)
       loginPage.typePassword(password)
       loginPage.clickLogin()
})



