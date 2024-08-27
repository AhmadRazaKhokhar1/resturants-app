import UserDetailsForm from "./UserDetailsForm";

describe('Testing UserDetailsForm', () => {
  beforeEach(() => {
    cy.mount(<UserDetailsForm setIsPaymentPopupOpen={cy.spy()} setIsUserDetailsFormOpen={cy.spy()} />);
    
    cy.get('#user-details-animation-div')
      .should('be.visible')
      .invoke('attr', 'style', 'transform: none !important; animation: none !important; visibility: visible !important; display: block !important;').scrollIntoView();
  });

 
    it('Checks if every field of the form is working', () => {
      cy.get('#fullName').should('be.visible').type('Ahmad Raza Khokhar', {force:true});
      cy.get('#address').should('be.visible').scrollIntoView().type('Chungi Amersadhu, Lahore', {force:true});
      cy.get('#phone').should('be.visible').scrollIntoView().type('+923008039275', {force:true});
      cy.get('#email').should('be.visible').scrollIntoView().type('ahmadrazawebexpert@gmail.com', {force:true}).scrollIntoView();
    });
    
});
