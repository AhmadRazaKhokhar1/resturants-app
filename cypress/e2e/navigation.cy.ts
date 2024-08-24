describe("navigation spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("#current-location").click();
    cy.get("#get-restaurants").click();
    cy.scrollTo("bottom");
    cy.get("#restaurant-card").click();
    cy.end();
  });
});
