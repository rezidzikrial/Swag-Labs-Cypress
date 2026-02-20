class Keranjang { 

    titleCart(){
        return cy.get('.title')
    }  

    cartList(){
        return cy.get('.cart_list')
    }

    qtyProduct(){
        return cy.get(".cart_quantity_label") 
    }

    name(item) { 
        return cy.wrap(item).find('.inventory_item_name') 
    }

    descItem() { 
        return cy.get('.inventory_item_desc') 
    }

    price() { 
        return cy.get('.inventory_item_price') 
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