import Inventory from "../PageObjects/inventoryPage";
import Login from "../PageObjects/loginPage";
import DetailsProduct from "../PageObjects/detailsProductPage";

const pageInventory = new Inventory()
const loginPage = new Login()
const detailsProduct = new DetailsProduct()


describe('Full page inventory', () => {
    
    beforeEach(()=> {
        cy.visit('/')

        loginPage.login(Cypress.env('username'), 
        Cypress.env("password") )
        
    })

    it('Product Page display', () => {
  
        cy.topBarValidate()
        cy.footBarValidate()
        pageInventory.imgProduct()
        pageInventory.nameProduct()
        pageInventory.descProduct()
        pageInventory.productPrice()
        pageInventory.addToCartButtons()
        pageInventory.sortDropdown()
        cy.url().should('include', '/inventory.html')
    });

    it('each product should have name, description, price, image, and add to cart button', () => {
    pageInventory.productList().each(($product) => {
      cy.wrap($product).within(() => {
        // pageInventory.productList()
        pageInventory.imgProduct().should('be.visible').and('exist')
        pageInventory.nameProduct().find().should('be.visible').and('exist').should('have.text', 'Sauce Labs Backpack')
        pageInventory.descProduct().should('be.visible').and('exist')
        pageInventory.productPrice().should('be.visible').and('exist')
        pageInventory.addToCartButtons().should('be.visible').and('exist')
      })
    })
  })

    it('Should Product can add to cart and update icon badge cart', ()=> {

        pageInventory.addToCartButtons().first().click()
        pageInventory.cartBadge().should('have.length', '1')  
        cy.get("#remove-sauce-labs-backpack").should('be.visible').should('have.text', 'Remove')
    })
      
      
    it('Sorting Product Name A to Z', ()=> {

        pageInventory.sortDropdown().select('az')
        pageInventory.nameProduct().then((names)=> {
          const actualNames = [...names].map(el => 
            el.innerText.trim()
          )

          const expectedNames = [...actualNames].sort()

          expect(actualNames).to.deep.equal(expectedNames)

        })
        
    })

    it('Sorting Product Name Z to A', ()=> {

      pageInventory.sortDropdown().select('za')
        pageInventory.nameProduct().then((names)=> {
          const actualNames = [...names].map(el => 
            el.innerText.trim()
          )

          const expectedNames = [...actualNames].sort().reverse()

          expect(actualNames).to.deep.equal(expectedNames)

        })
        
    })

    it('Sorting Product Price Low to High', ()=> {

        pageInventory.sortDropdown().select('lohi')
          pageInventory.productPrice().then((prices)=> {
            const actualPrice = [...prices].map(el => 
              parseFloat(el.innerText.replace('$', ''))
            )

            const expectedPrices = [...actualPrice].sort((a, b)=> a - b)

            expect(actualPrice).to.deep.equal(expectedPrices)
          })
    })

    it('Sorting Product Price High to Low', ()=> {

        pageInventory.sortDropdown().select('hilo')
          pageInventory.productPrice().then((prices)=> {
            const actualPrices = [...prices].map(el => 
              parseFloat(el.innerText.replace('$', ''))
            )

            const expectedPrices = [...actualPrices].sort((a,b)=> b - a)

            expect(actualPrices).to.deep.equal(expectedPrices)
          })
    })

});