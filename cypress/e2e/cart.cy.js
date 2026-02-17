
describe('Cart Testing', () => {

    beforeEach(()=>{
        cy.visit('/')
        cy.loginPOM(Cypress.env('username'), Cypress.env('password'))
    })

    it('Cart Page Test validate element', () => {
            cy.get('#add-to-cart-sauce-labs-backpack').click()
                Cypress.pageInventory.cartBadge().should('have.length', '1')  
                Cypress.pageInventory.cartLink().click()

                cy.topBarValidate()
                cy.footBarValidate()

                cy.get('.title').should('be.visible').and('have.text', 'Your Cart')
                cy.get('.cart_quantity_label').should('be.visible').and('have.text', 'QTY')
                cy.get('.cart_desc_label').should('be.visible').and('have.text', 'Description')

            cy.get('.cart_item').each(($product)=> {
            cy.wrap($product).within(() => {
                
                cy.url().should('include', 'cart.html')
                
                cy.get('.cart_quantity').should('be.visible').and('exist')
                Cypress.pageInventory.nameProduct().should('be.visible').should('have.text', 'Sauce Labs Backpack')
                Cypress.pageInventory.descProduct().should('be.visible').should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
                Cypress.pageInventory.productPrice().should('be.visible').should('have.text', '$29.99')
                cy.get('#remove-sauce-labs-backpack').should('be.visible').should('have.text', 'Remove')
                
            })

            cy.get('#continue-shopping').should('be.visible').should('have.text', 'Continue Shopping')
            cy.get('#checkout').should('be.visible').should('have.text', 'Checkout')
        })
    });

    it('Remove Product From Cart', ()=> {

        cy.get('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.length', '1')  
        Cypress.pageInventory.cartLink().click()
        cy.get('.cart_item').should('exist').should('be.visible')
        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.cart_item').should('not.exist')

    })

    it('add product to cart and Continue Shopping', ()=> {

        cy.get('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.length', '1')  
        Cypress.pageInventory.cartLink().click()
        cy.get('.cart_item').should('exist').should('be.visible')
        cy.get('#continue-shopping').click()
        cy.url().should('include', 'inventory.html')
        Cypress.pageInventory.productList().should('exist')
    })

    it('Click Checkout button', ()=> {

        cy.get('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.length', '1')  
        Cypress.pageInventory.cartLink().click()
        cy.get('.cart_item').should('exist').should('be.visible')
        cy.get('#checkout').click()
        cy.url().should('include', 'checkout-step-one.html')
        cy.get('.title').should('be.visible').and('have.text', 'Checkout: Your Information')
        cy.get('.checkout_info').should('exist')
    })

    it.only('Negative test Click Checkout button with empty product in cart', ()=> {

        Cypress.pageInventory.cartLink().click()
        cy.get('#checkout').click()
        cy.url().should('include', 'checkout-step-one.html')
        cy.get('.title').should('be.visible').and('have.text', 'Checkout: Your Information')
        cy.get('.checkout_info').should('exist')
    })
});