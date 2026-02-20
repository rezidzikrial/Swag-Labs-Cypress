describe('Complete Checkout Page', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.completeCheckout()
    });

    it('Validate Element Page', () => {
        
        cy.url().should('include', 'checkout-complete.html')

        Cypress.pageInventory.cartBadge().should('not.exist')
        Cypress.completeCo.titleComplete().should('be.visible').should('have.text', 'Checkout: Complete!')
        Cypress.completeCo.pageComplete().should('be.visible')
        Cypress.completeCo.completeImg().should('be.visible')
        Cypress.completeCo.completeMsg().should('be.visible').should('have.text', 'Thank you for your order!')
        Cypress.completeCo.completeText().should('be.visible').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        Cypress.completeCo.backHomeButton().should('be.visible').should('have.text', 'Back Home')

    });

    it('Back Home Button Test', ()=> {
           
        Cypress.completeCo.backHomeButton().should('be.visible').should('have.text', 'Back Home').click()

        cy.url().should('include', 'inventory')

        Cypress.pageInventory.productList().each(($product) => {
        cy.wrap($product).within(() => {
        // pageInventory.productList()
        Cypress.pageInventory.imgProduct().should('be.visible').should('have.length.greaterThan', 0)
        Cypress.pageInventory.nameProduct().should('be.visible')
        Cypress.pageInventory.descProduct().should('be.visible')
        Cypress.pageInventory.productPrice().should('be.visible')
        Cypress.pageInventory.addAndRemoveCartButtons().should('be.visible')
      })
    })

        Cypress.pageInventory.imgProduct().should('be.visible')
        Cypress.pageInventory.nameProduct().should('be.visible')
        Cypress.pageInventory.descProduct().should('be.visible')
        Cypress.pageInventory.productPrice().should('be.visible')
        Cypress.pageInventory.addAndRemoveCartButtons().should('be.visible')
        Cypress.pageInventory.sortDropdown().should('be.visible')
        Cypress.pageInventory.cartBadge().should('not.exist')

    })
});