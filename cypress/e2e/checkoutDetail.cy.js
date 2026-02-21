describe('Test Detail Checkout Page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.loginPOM(Cypress.env('username'), Cypress.env('password'))

        Cypress.pageInventory.addAndRemoveCartButtons().find('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.text', '1')
        Cypress.pageInventory.addAndRemoveCartButtons().find('#add-to-cart-sauce-labs-bike-light').click()
        Cypress.pageInventory.cartBadge().should('have.text', '2')    
        Cypress.pageInventory.cartLink().click()

        cy.topBarValidate()
        cy.footBarValidate()
        
        Cypress.cartPage.checkoutButton().click()
        cy.inputFormCo('rezi', 'alfa', '69')
        Cypress.coForm.continueCoButton().click()
        Cypress.pageInventory.cartBadge().should('be.visible').should('have.text', '2')
    });

    it('Should display checkout overview page correctly', () => {
        
        const expectedProducts = [
            {
                name: 'Sauce Labs Backpack',
                desc: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
                price: '$29.99'
            },
            {
                name: 'Sauce Labs Bike Light',
                desc: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
                price: '$9.99'
            }
        ]

        cy.url().should('include', 'checkout-step-two.html')

        cy.get('.cart_item').each(($item, index) => {

            cy.wrap($item).find('.inventory_item_name')
            .should('have.text', expectedProducts[index].name)

            cy.wrap($item).find('.inventory_item_desc')
            .should('have.text', expectedProducts[index].desc)

            cy.wrap($item).find('.inventory_item_price')
            .should('have.text', expectedProducts[index].price)

})

        Cypress.detailCo.titleCo().should('be.visible').should('have.text', 'Checkout: Overview')
        
        Cypress.detailCo.paymentLabel().should('be.visible')
        Cypress.detailCo.paymentInfo().should('be.visible')
        Cypress.detailCo.shipLabel().should('be.visible')
        Cypress.detailCo.shipingInfo().should('be.visible')
        Cypress.detailCo.priceTotal().should('be.visible')
        Cypress.detailCo.itemTotal().should('be.visible')
        Cypress.detailCo.infoTax().should('be.visible')
        Cypress.detailCo.totalTax().should('be.visible')
        Cypress.detailCo.cancelButton().should('be.visible')
        Cypress.detailCo.finishButton().should('be.visible')

    });

    it('Validate Payment Information, Shipping Information, & Price Total have coreectly data', () => {

        let itemTotal = 0

        //validasi payment
        Cypress.detailCo.paymentInfo().should('contain.text', '31337')
        Cypress.detailCo.shipingInfo().should('contain.text', 'Free Pony Express Delivery')
        Cypress.detailCo.itemTotal().should('contain.text', '$39.98')
        Cypress.detailCo.infoTax().should('contain.text', '$3.20')
        Cypress.detailCo.totalTax().should('contain.text', '$43.18')

        //validasi total price
        Cypress.cartPage.price()
        .each(($price) => {
        const value = parseFloat($price.text().replace('$', ''))
        itemTotal += value
        })
        .then(() => {

        Cypress.detailCo.itemTotal()
        .invoke('text')
        .then((text) => {
        const subtotal = parseFloat(text.replace('Item total: $', ''))
        expect(subtotal).to.eq(itemTotal)
      })
    })
});

    it('Test Cancel Button Checkout Detail', () => {

        Cypress.detailCo.cancelButton().click()
        cy.url().should('include', 'inventory.html')
        Cypress.pageInventory.cartBadge().should('be.visible')
        Cypress.pageInventory.cartBadge().should('have.text', 2)
        Cypress.pageInventory.addAndRemoveCartButtons().find('#remove-sauce-labs-backpack').should('be.visible').and('have.text', 'Remove')
        Cypress.pageInventory.addAndRemoveCartButtons().find('#remove-sauce-labs-bike-light').should('be.visible').and('have.text', 'Remove')

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
}) 

    it('Test Finish Button Checkout Detail', ()=> {

        Cypress.detailCo.finishButton().click()
        cy.url().should('include', 'checkout-complete.html')
        Cypress.completeCo.titleComplete().should('be.visible').should('have.text', 'Checkout: Complete!')
        Cypress.completeCo.pageComplete().should('be.visible')
        Cypress.completeCo.completeImg().should('be.visible')
        Cypress.completeCo.completeMsg().should('be.visible').should('have.text', 'Thank you for your order!')
        Cypress.completeCo.completeText().should('be.visible').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        Cypress.completeCo.backHomeButton().should('be.visible').should('have.text', 'Back Home')
    })
});