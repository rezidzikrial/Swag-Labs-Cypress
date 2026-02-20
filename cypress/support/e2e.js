// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
/// <reference types="cypress"/>
import Inventory from "../PageObjects/inventoryPage";
import Login from "../PageObjects/loginPage";
import DetailsProduct from "../PageObjects/detailsProductPage";
import Keranjang from '../PageObjects/cartPage';
import CheckoutStepOne from '../PageObjects/checkoutStep1';
import CheckoutStepTwo from '../PageObjects/checkoutStep2';
import CompleteCo from '../PageObjects/completePage';

Cypress.loginPage = new Login()
Cypress.pageInventory = new Inventory()
Cypress.detailsProduct = new DetailsProduct()
Cypress.cartPage = new Keranjang()
Cypress.coForm = new CheckoutStepOne()
Cypress.detailCo = new CheckoutStepTwo()
Cypress.completeCo = new CompleteCo()
