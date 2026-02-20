class CheckoutStepTwo {

    titleCo(){
        return cy.get('.title')
    }

    paymentInfo(){
        return cy.get("div[data-test='payment-info-value']")
    }

    paymentLabel(){
        return cy.get("div[data-test='payment-info-label']")
    }

    shipLabel(){
        return cy.get("div[data-test='shipping-info-label']")
    }
    
    shipingInfo(){
        return cy.get("div[data-test='shipping-info-value']")
    }

    priceTotal(){
        return cy.get("div[data-test='total-info-label']")
    }

    itemTotal(){
        return cy.get(".summary_subtotal_label")
    }

    infoTax(){
        return cy.get('.summary_tax_label')
    }

    totalTax(){
        return cy.get('.summary_total_label')
    }

    cancelButton(){
        return cy.get("#cancel")  
    }

    finishButton(){
        return cy.get("#finish")
    }


}
export default CheckoutStepTwo