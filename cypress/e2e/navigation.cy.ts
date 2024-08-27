describe("navigation spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("#current-location").should("be.visible").click();
    cy.get("#get-restaurants").should("be.visible").click();
    cy.scrollTo("bottom");

    cy.get("#restaurant-card").should("be.visible").click();
    cy.scrollTo("bottom").wait(500);

    cy.get("#product-card").wait(500).should("be.visible").click();
    cy.get("#initiate-add-to-cart").should("be.visible").click();
    cy.get("#add-to-cart").should("be.visible").click();

    cy.get("#cart").should("be.visible").click();
    cy.get("#go-to-user-details").should("be.visible").click();
    
    cy.get("#fullName").should("be.visible").type("Ahmad Raza Khokhar");
    cy.get("#address").should("be.visible").type("Chungi Amersadhu, Lahore");
    cy.get("#phone").should("be.visible").type("+923008039275");
    cy.get("#email").should("be.visible").type("ahmadrazawebexpert@gmail.com");
    cy.scrollTo("top")
    cy.get("#go-to-final-checkout").should("be.visible").click();
    // cy.get("payment-details").should("be.visible");
    
    cy.get("#cardNumber").should("be.visible").type("5555555555555555");
    cy.get("#expiryDate").should("be.visible").type("2026-06");
    cy.get("#cvv").should("be.visible").type("555");
    cy.get("#pay-now").should("be.visible").click()
    cy.end();
  });
});
