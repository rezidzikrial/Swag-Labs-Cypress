class Keranjang { 

    titleCart(){
        return cy.get('.title')
    }  

    cartList(){
        return cy.get('.cart_item')
    }

    qtyProduct(){
        return cy.get(".cart_quantity_label") 
    }

    descProduct(){
        return cy.get(".cart_quantity_label") 
    }

    itemBar(){
        return cy.get('.item_pricebar')
    }

    backShoppingButton(){
        return cy.get('#continue-shopping')
    }

    checkoutButton() {
        return cy.get('#checkout')
    }

}

export default Keranjang