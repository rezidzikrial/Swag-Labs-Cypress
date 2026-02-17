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

    removeCartButtons() {
    return cy.get('#remove')
  }
}

export default DetailsProduct