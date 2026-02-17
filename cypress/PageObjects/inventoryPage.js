class Inventory {

productList() {
    return cy.get('.inventory_item').should('be.visible')
  }

  imgProduct() {
    return cy.get('.inventory_item_img').should('be.visible')
  }

  nameProduct () {
    return cy.get('.inventory_item_name ').should('be.visible')
  }

  descProduct () {
    return cy.get(".pricebar>.inventory_item_price").should('be.visible')
  }

  productPrice() {
    return cy.get(".inventory_item_price").should('be.visible')
  }

  addToCartButtons() {
    return cy.get('button[data-test^="add-to-cart"]')
  }

  cartBadge() {
    return cy.get('.shopping_cart_badge') 
  }

  cartLink() { 
    return cy.get('.shopping_cart_link')
  }

  sortDropdown() {
    return cy.get('.product_sort_container').should('be.visible')
  }
}

export default Inventory
