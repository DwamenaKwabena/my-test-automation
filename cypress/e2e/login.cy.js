/// <reference types="cypress"/>

describe("test login page using sauce demo e-commerce", () => {
  before(() => {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });

  // test for successful login
  it("should login to page successfully", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.url().should("eq", "https://www.saucedemo.com/");

    cy.get('[data-test="username"]')
      .should("have.attr", "data-test", "username")
      .type("standard_user");

    cy.get('[data-test="password"]')
      .should("have.attr", "data-test", "password")
      .type("secret_sauce");

    cy.get('[data-test="login-button"]').should("have.value", "Login").click();
    cy.url().should("include", "/inventory.html");
  });

  // test for unsuccessful login with error message
  it("should not login user and should show an error message", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.url().should("eq", "https://www.saucedemo.com/");

    cy.get('[data-test="username"]')
      .should("have.attr", "data-test", "username")
      .type("locked_out_user");

    cy.get('[data-test="password"]')
      .should("have.attr", "data-test", "password")
      .type("secret_sauce");

    cy.get('[data-test="login-button"]').contains("Login").click();

    cy.get('[data-test="error"]').should(
      "contain.text",
      "Sorry, this user has been locked out."
    );
  });
});
