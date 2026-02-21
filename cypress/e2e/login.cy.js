/// <reference types="cypress"/>
describe('Dashboard test', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').should('be.visible').type(Cypress.env("username")).should('have.value', Cypress.env("username"))
        cy.get('#password').should('be.visible').type(Cypress.env("password"))
        cy.get('#login-button').should('be.visible').click()
        
    });
   
    it('positive login successfully and user can access dashboard', () => {
        //cek validasi url dashboard
        cy.url().should('include', '/inventory')

        //vlaidasi cek title
        cy.title().should('eq', 'Swag Labs')

        //validasi logo
        cy.get('.header_label > .app_logo').should('be.visible')

        //Validasi Produk muncul
        cy.get('div[class="inventory_list"]>div.inventory_item').should('be.visible')

        // Validasi Cart icon ada
        cy.get('.shopping_cart_link').should('be.visible')

        // validasi Logout button ada
        cy.get('#react-burger-menu-btn').click().should('be.visible')
        cy.get('#logout_sidebar_link').should('be.visible').and('have.text', 'Logout').click()
        cy.url().should('eq', 'https://www.saucedemo.com/')

    });

});

describe('negative login test', () => {

    beforeEach(()=>{
        
    })

    it('login failed form validation invalid username', () => {
        cy.visit('/')
        
        //login dengan masukan field username salah dan password benar
        cy.get('[data-test="username"]').should('be.visible').type('invalid_username').should('have.value', ('invalid_username'));
        cy.get('[data-test="password"]').should('be.visible').type(Cypress.env('password')).should('have.value', Cypress.env('password'));
        cy.get('[data-test="login-button"]').click().should('be.visible');

        //validasi error
        cy.get("h3[data-test='error']").should('be.visible')
        .should('contain', 'Username and password do not match any user in this service').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation invalid password', () => {
        cy.visit('/')
        //login dengan masukan field username benar dan password salah
        cy.get('[data-test="username"]').type(Cypress.env('username'));
        cy.get('[data-test="password"]').type('invlaid_password');
        cy.get('[data-test="login-button"]').should('be.visible').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Username and password do not match any user in this service').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation empty username', () => {
        cy.visit('/')
        //login tanpa menginput username benar dan masukan password
        cy.get('[data-test="password"]').type('invlaid_password');
        cy.get('[data-test="login-button"]').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Username is required').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation, empty password', () => {
        cy.visit('/')
        //login dengan masukan username dan passwork kosong
        cy.get('[data-test="username"]').type(Cypress.env('username'));
        cy.get('[data-test="login-button"]').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Password is required').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation with empty username and password', () => {
        cy.visit('/')
        //login tanpa memasukan username dan password
        cy.get('[data-test="login-button"]').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Username is required').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation with script injection', () => {
        cy.visit('/')
        //login dengan menginput script injection
        cy.get('[data-test="username"]').type('<script>alert(1)</script>');
        cy.get('[data-test="password"]').type('<script>alert(1)</script>');
        cy.get('[data-test="login-button"]').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Username and password do not match any user in this service').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation with SQL Injection', () => {
        cy.visit('/')
        //login dengan menginput script injection
        cy.get('[data-test="username"]').type(' OR 1=1 --');
        cy.get('[data-test="password"]').type(' OR 1=1 --');
        cy.get('[data-test="login-button"]').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Username and password do not match any user in this service').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed form validation with Emoji', () => {
        cy.visit('/')
        //login dengan menginput script injection
        cy.get('[data-test="username"]').type('😊😊😊');
        cy.get('[data-test="password"]').type('😊😊😊');
        cy.get('[data-test="login-button"]').click();

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', 'Username and password do not match any user in this service').should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });

    it('login failed with url dashboard', {bug: ['page not found']}, () => {
        //Masuk ke halaman url web sauce demo
        cy.visit('https://www.saucedemo.com/inventory/html');

        //validasi error
        cy.get("h3[data-test='error']")
        .should('contain', "You can only access '/inventory.html' when you are logged in.").should('be.visible')
        cy.url().should('not.include', '/inventory.html')
    });
});