import React from 'react'
import FinalCheckout from './FinalCheckout'

describe('Final Checkout Form', () => {
  beforeEach(()=>{
    cy.mount(<FinalCheckout setIsPaymentPopupOpen={cy.spy()} totalPrice={1000} key={"@!@$#@#$%@#$%"} />)
    cy.get("#payment-details").invoke('attr', 'style', 'transform: none !important; animation: none !important; visibility: visible !important; display: block !important;').scrollIntoView();
  })
  it('fills the form', () => {
    cy.get("#cardNumber").scrollIntoView().should("be.visible").type("555555555555555555",{force:true})
    cy.get("#expiryDate").scrollIntoView().should("be.visible").type("2028-06",{force:true})
    cy.get("#cvv").scrollIntoView().should("be.visible").type("555",{force:true})
    cy.get("#pay-now").should("be.visible").click({force:true})
  })
})