class DetailsProduct {

    detailNameProduct() {
        return cy.get(".inventory_details_desc_container")
  }

    detailImgProduct() {
        return cy.get("img[alt='Sauce Labs Backpack']")
    }

    detailDescProduct() {
        return cy.get(".inventory_details_desc")
    }

    detailPriceProduct() {
        return cy.get(".inventory_details_price")
    }

    addToCart(){
        return cy.get('#add-to-cart')
    }

    removeCartButtons() {
    return cy.get('#remove')
  }
}

export default DetailsProduct