describe('Test Step one Checkout Information', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.loginPOM(Cypress.env('username'), Cypress.env('password'))

        Cypress.pageInventory.addAndRemoveCartButtons().find('#add-to-cart-sauce-labs-backpack').click()
        Cypress.pageInventory.cartBadge().should('have.text', '1')  
        Cypress.pageInventory.cartLink().click()

        cy.topBarValidate()
        cy.footBarValidate()

        Cypress.cartPage.checkoutButton().click()
    });

    it('Test Validate element Checkout Form ', () => {
        
        //validate element checkout form
        Cypress.coForm.titleCo().should('be.visible')
        Cypress.coForm.inputFirstName().should('be.visible')
        Cypress.coForm.inputLastName().should('be.visible')
        Cypress.coForm.inputCodeZip().should('be.visible')
        Cypress.coForm.cancelCoButton().should('be.visible')
        Cypress.coForm.continueCoButton().should('be.visible')

    });

    it('Test input form Positive & Negative Check Out', ()=> {
        cy.fixture('formCheckOut').then((forms)=>{
            forms.forEach((form)=>{

                cy.inputFormCo(form.firstName, form.lastName, form.codeZip)
                Cypress.coForm.continueCoButton().click()
                if(form.expected === 'checkout-step-two'){
                    Cypress.coForm.verifyInputForm()
                    cy.go('back')
                }else{
                    cy.get("h3[data-test='error']").should('be.visible').should('have.text', form.expected)
                    cy.url().should('include', 'checkout-step-one.html')
                }
            })
        })
    })

    it.only('Test input form Check Out & click cancel', ()=> {
        
        cy.inputFormCo('rezi', 'alfa', '69')
        Cypress.coForm.inputFirstName().should('have.value', 'rezi')
        Cypress.coForm.inputLastName().should('have.value', 'alfa')
        Cypress.coForm.inputCodeZip().should('have.value', '69')
        Cypress.coForm.cancelCoButton().click()

        cy.url().should('include', 'cart')
        Cypress.cartPage.titleCart().should('be.visible').and('have.text', 'Your Cart')
        Cypress.cartPage.cartList().should('exist')
        Cypress.cartPage.checkoutButton().should('be.visible')
        

    })
});

    
