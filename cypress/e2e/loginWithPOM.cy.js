import Login from "../PageObjects/loginPage";
const loginpage = new Login()

describe('skenario positive login', () => {
    
    beforeEach(()=> {
        cy.visit('/')
    })

    it('TC Login valid', () => {
        
        cy.fixture('validUser').then((users)=> {
            users.forEach((user)=> {

                cy.loginPOM(user.username, user.password)

                if(user.expected === 'inventory'){
                    loginpage.verifyLogin()
                    loginpage.logoutButton()
                }else{
                    cy.get("h3[data-test='error']").should('be.visible').should('have.text', user.expected)
                    cy.url().should('not.include', '/inventory')
                }

            })
        }) 
    });
});

describe('skenario negative login', () => {

    beforeEach(()=> {
        cy.visit('/')
    })

    it('TC invalid login', () => {

    cy.fixture('invalidUser').then((users)=> {
        users.forEach((user)=> {
            
            cy.loginPOM(user.username, user.password)

                cy.get("h3[data-test='error']")
                .should('have.text', user.expected)
                .should('be.visible')
                cy.url().should('not.include', '/inventory')
            
            })
        })
    })
});