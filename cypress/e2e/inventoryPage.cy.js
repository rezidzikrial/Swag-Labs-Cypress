
describe('Full page inventory', () => {
    
    beforeEach(()=> {
        cy.visit('/')

        cy.loginPOM(Cypress.env('username'), 
        Cypress.env("password"))
        cy.url().should('include', '/inventory.html')
    })

    it('Product Page display', () => {
  
        cy.topBarValidate()
        cy.footBarValidate()
        Cypress.pageInventory.imgProduct().should('be.visible')
        Cypress.pageInventory.nameProduct().should('be.visible')
        Cypress.pageInventory.descProduct().should('be.visible')
        Cypress.pageInventory.productPrice().should('be.visible')
        Cypress.pageInventory.addAndRemoveCartButtons().should('be.visible')
        Cypress.pageInventory.sortDropdown().should('be.visible')
    });

    it('each product should have name, description, price, image, and add to cart button', () => {

    cy.fixture('detailsProduct', {bug: ['there is a name and desc bug on the product that does not match']}).then((products)=> {

        Cypress.pageInventory.productList().should('have.length', products.length)

        Cypress.pageInventory.productList().each(($el, index)=> {

          cy.wrap($el).within(()=>{
            Cypress.pageInventory.nameProduct().should('have.text', products[index].name)//BUG nama tidak sesuai, ada typo di produk (Sauce T-shirt (Red) )
            Cypress.pageInventory.descProduct().should('have.text', products[index].desc)//BUG ada deskripsi tidak sesuai di produk "Sauce Labs Backpack"
            Cypress.pageInventory.productPrice().should('have.text', products[index].price)
          })
        })
      })
    })

    it('Should Product can add to cart and update icon badge cart', ()=> {

        Cypress.pageInventory.productList().should('have.length.greaterThan', 0).and('exist')
        Cypress.pageInventory.addAndRemoveCartButtons()
        .find("#add-to-cart-sauce-labs-backpack")
        .click()
        Cypress.pageInventory.cartLink().should('be.visible')
        Cypress.pageInventory.cartBadge().should('have.text', '1')  
        cy.get("#remove-sauce-labs-backpack").should('be.visible').should('have.text', 'Remove')
    })
      
    it('Should Product can remove from cart and update icon badge cart', ()=> {

        Cypress.pageInventory.addAndRemoveCartButtons()
        .find("#add-to-cart-sauce-labs-backpack")
        .click()
        Cypress.pageInventory.cartLink().should('be.visible')
        Cypress.pageInventory.cartBadge().should('have.text', '1')
        Cypress.pageInventory.addAndRemoveCartButtons().find("#remove-sauce-labs-backpack").should('be.visible').should('have.text', 'Remove').click()
        Cypress.pageInventory.cartBadge().should('not.exist')
        

    })
      
    it('Sorting Product Name A to Z', ()=> {

        Cypress.pageInventory.sortDropdown().select('az')
        Cypress.pageInventory.nameProduct().then((names)=> {
          const actualNames = [...names].map(el => 
            el.innerText.trim()
          )

          const expectedNames = [...actualNames].sort()

          expect(actualNames).to.deep.equal(expectedNames)
          expect(actualNames.length).to.be.greaterThan(1)

        })
        
    })

    it('Sorting Product Name Z to A', ()=> {

      Cypress.pageInventory.sortDropdown().select('za')
      Cypress.pageInventory.productList()
      .should('have.length.greaterThan', 0)
        Cypress.pageInventory.nameProduct().then((names)=> {
          const actualNames = [...names].map(el => 
            el.innerText.trim()
          )

          const expectedNames = [...actualNames].sort().reverse()

          expect(actualNames).to.deep.equal(expectedNames)
          expect(actualNames.length).to.be.greaterThan(1)
        })
        
    })

    it('Sorting Product Price Low to High', ()=> {

        Cypress.pageInventory.sortDropdown().select('lohi')
        Cypress.pageInventory.productList()
        .should('exist')
        .and('have.length.greaterThan', 0)
          Cypress.pageInventory.productPrice().then((prices)=> {
            const actualPrice = [...prices].map(el => 
              parseFloat(el.innerText.replace('$', ''))
            )

            const expectedPrices = [...actualPrice].sort((a, b)=> a - b)

            expect(actualPrice).to.deep.equal(expectedPrices)
          })
    })

    it('Sorting Product Price High to Low', ()=> {

        Cypress.pageInventory.sortDropdown().select('hilo')
          Cypress.pageInventory.productPrice().then((prices)=> {
            const actualPrices = [...prices].map(el => 
              parseFloat(el.innerText.replace('$', ''))
            )

            const expectedPrices = [...actualPrices].sort((a,b)=> b - a)

            expect(actualPrices).to.deep.equal(expectedPrices)
          })
  })
})