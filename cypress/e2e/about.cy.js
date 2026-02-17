describe('Page About Test', () => {

    beforeEach(()=>{
        cy.visit('/')
        cy.loginPOM(Cypress.env('username'), Cypress.env('password'))
    })

    it('About Page Test', () => {
        
        cy.topBarValidate()
        cy.footBarValidate()

        cy.get("#react-burger-menu-btn").should('be.visible').and('exist').click()
        cy.get("#about_sidebar_link").should('be.visible').click()
        cy.url().should('eq', 'https://saucelabs.com/')
        cy.title().should('eq', 'Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing')
    });
});