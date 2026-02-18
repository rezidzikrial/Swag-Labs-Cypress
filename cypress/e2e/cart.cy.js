
describe('Cart Testing', () => {

    beforeEach(()=>{
        cy.visit('/')
        cy.loginPOM(Cypress.env('username'), Cypress.env('password'))
    })

    it.only('Cart Page Test validate element', () => {

                Cypress.pageInventory.addAndRemoveCartButtons().find('#add-to-cart-sauce-labs-backpack').click()

                Cypress.pageInventory.cartLink().click()

                cy.go('back')

                Cypress.pageInventory.addAndRemoveCartButtons().find("#add-to-cart-sauce-labs-bike-light").click()

                Cypress.pageInventory.cartBadge().should('have.text', '2')  
                Cypress.pageInventory.cartLink().click()
                cy.url().should('include', 'cart.html')

                cy.topBarValidate()
                cy.footBarValidate()

                Cypress.cartPage.title().should('be.visible').and('have.text', 'Your Cart')
                Cypress.cartPage.qtyProduct.should('be.visible').and('have.text', 'QTY')
                cy.get('.cart_desc_label').should('be.visible').and('have.text', 'Description')

            cy.get('.cart_item').each(($product)=> {
            cy.wrap($product).within(() => {
                
                Cypress.cartPage.qtyProduct().should('be.visible')
                Cypress.pageInventory.nameProduct().should('be.visible')
                Cypress.pageInventory.descProduct().should('be.visible')
                Cypress.pageInventory.productPrice().should('be.visible')
                Cypress.cartPage.itemBar().should('be.visible')
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

        Cypress.pageInventory.addAndRemoveCartButtons.find('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.text', '1')  
        Cypress.pageInventory.cartLink().click()
        cy.get('.cart_item').should('exist').should('be.visible')
        Cypress.cartPage.backShoppingButton().click()
        cy.url().should('include', 'inventory.html')
        Cypress.pageInventory.productList().should('exist')
    })

    it('Click Checkout button', ()=> {

        cy.get('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.text', '1')  
        Cypress.pageInventory.cartLink().click()
        Cypress.cartPage.cartList().should('exist').should('be.visible')
        Cypress.cartPage.checkoutButton().click()
        cy.url().should('include', 'checkout-step-one.html')
        Cypress.coForm.titleCo().should('be.visible').and('have.text', 'Checkout: Your Information')
        cy.get('#checkout_info_container').should('exist')
    })

    it('Negative test Click Checkout button with empty product in cart', {bug: ['empty products in cart but can checkout']}, ()=> {

        Cypress.pageInventory.cartLink().click()
        cy.get('#checkout').click()
        cy.url().should('include', 'checkout-step-one.html')
        cy.get('.title').should('be.visible').and('have.text', 'Checkout: Your Information')
        cy.get('.checkout_info').should('exist')
    })
});