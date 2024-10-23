/// <reference types="cypress" />

describe("test checkout page functionality", () => {
  before(() => {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });

  it("submit info in checkout page and place order", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.get('[data-test="username"]').type("standard_user");

    cy.get('[data-test="password"]').type("secret_sauce");

    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="checkout"]')
      .should("have.attr", "data-test", "checkout")
      .click();

    cy.url().should("include", "/checkout-step-one.html");

    cy.get('[data-test="firstName"]')
      .should("have.attr", "data-test", "firstName")
      .type("Kay");

    cy.get('[data-test="lastName"]')
      .should("have.attr", "data-test", "lastName")
      .type("Tizz");

    cy.get('[data-test="postalCode"]')
      .should("have.attr", "data-test", "postalCode")
      .type("00233");

    cy.get('[data-test="continue"]')
      .should("have.attr", "data-test", "continue")
      .click();

    cy.url().should("include", "/checkout-step-two.html");

    cy.get('[data-test="finish"]')
      .should("have.attr", "data-test", "finish")
      .click();
  });

  it.only("should not place order and should show an error message", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.get('[data-test="username"]').type("standard_user");

    cy.get('[data-test="password"]').type("secret_sauce");

    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]')
      .should("have.attr", "data-test", "firstName")
      .type("Kay");

    cy.get('[data-test="lastName"]')
      .should("have.attr", "data-test", "lastName")
      .type("Tizz");

    cy.get('[data-test="continue"]')
      .should("have.attr", "data-test", "continue")
      .click();

    cy.get(".error-message-container").should("contain.text", "required");
  });
});
