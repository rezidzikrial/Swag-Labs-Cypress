
describe('Detail Product Page Test', () => {

    beforeEach(()=> {
        cy.visit('/')
        cy.loginPOM(Cypress.env('username'), Cypress.env('password'))
    })

    it('display detail product test', ()=> {
        cy.topBarValidate()
        cy.footBarValidate()
        Cypress.pageInventory.productList().find("a[id='item_4_title_link'] div[class='inventory_item_name ']").click()

        cy.get('[data-test="back-to-products"]').should('be.visible').and('exist').should('have.text', 'Back to products').click()

        cy.go('back')

        cy.url().should('include', 'inventory-item.html?id=4')

        Cypress.detailsProduct.detailNameProduct().find(".inventory_details_name.large_size").should('be.visible').and('have.text', 'Sauce Labs Backpack')
        Cypress.detailsProduct.detailImgProduct().should('be.visible')
        Cypress.detailsProduct.detailDescProduct().should('exist').and('be.visible')
        Cypress.detailsProduct.detailPriceProduct().should('exist').and('contain.text', '$29.99')
        Cypress.pageInventory.addToCartButtons().should('be.visible').and('exist')
        cy.get('[data-test="back-to-products"]').should('be.visible').and('exist').should('have.text', 'Back to products')
      })

      it('Add to cart from detail product', ()=> {

        Cypress.pageInventory.productList().find("#item_0_title_link").click()

        Cypress.pageInventory.addToCartButtons().click()

        Cypress.pageInventory.cartBadge().should('have.length', '1')

        Cypress.detailsProduct.removeCartButtons().should('be.visible').and('exist').should('have.text', 'Remove')

      })

      it('Remove to cart from detail product', ()=> {

        Cypress.pageInventory.productList().find("#item_0_title_link").click()

        Cypress.pageInventory.addToCartButtons().click()

        Cypress.pageInventory.cartBadge().should('have.length', '1')

        Cypress.detailsProduct.removeCartButtons().should('be.visible').and('exist').should('have.text', 'Remove')

        Cypress.detailsProduct.removeCartButtons().click()
        
        Cypress.pageInventory.cartBadge().should('not.exist')
      })
});