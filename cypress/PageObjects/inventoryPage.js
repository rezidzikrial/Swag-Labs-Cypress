class Inventory {

productList() {
    return cy.get('.inventory_item')
  }

  imgProduct() {
    return cy.get('.inventory_item_img')
  }

  nameProduct () {
    return cy.get('.inventory_item_name ')
  }

  descProduct () {
    return cy.get(".inventory_item_desc")
  }

  productPrice() {
    return cy.get(".inventory_item_price")
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
