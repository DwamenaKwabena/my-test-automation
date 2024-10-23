/// <reference types="cypress" />

describe("test add to cart functionality", () => {
  before(() => {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  });

  // test add and remove from cart feature
  it("add particular products to cart", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.get('[data-test="username"]').type("standard_user");

    cy.get('[data-test="password"]').type("secret_sauce");
    
    cy.get('[data-test="login-button"]').click();

    // check for image visibility before adding items to cart
    cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').should(
      "be.visible"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should("have.attr", "data-test", "add-to-cart-sauce-labs-backpack")
      .click();

    cy.get('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]').should(
      "be.visible"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .should("have.attr", "data-test", "add-to-cart-sauce-labs-fleece-jacket")
      .click();

    cy.get('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]').should(
      "be.visible"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .should("have.attr", "data-test", "add-to-cart-sauce-labs-bolt-t-shirt")
      .click();

    cy.get('[data-test="inventory-item-sauce-labs-bike-light-img"]').should(
      "be.visible"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .should("have.attr", "data-test", "add-to-cart-sauce-labs-bike-light")
      .click();

    cy.get(
      '[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]'
    ).should("be.visible");
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
      .should(
        "have.attr",
        "data-test",
        "add-to-cart-test.allthethings()-t-shirt-(red)"
      )
      .click();

    cy.get('[data-test="inventory-item-sauce-labs-onesie-img"]').should(
      "be.visible"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]')
      .should("have.attr", "data-test", "add-to-cart-sauce-labs-onesie")
      .click();

    // remove some items from cart
    cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]')
      .should(
        "have.attr",
        "data-test",
        "remove-test.allthethings()-t-shirt-(red)"
      )
      .click();

    cy.get('[data-test="remove-sauce-labs-onesie"]')
      .should("have.attr", "data-test", "remove-sauce-labs-onesie")
      .click();

    cy.get('[data-test="remove-sauce-labs-bike-light"]')
      .should("have.attr", "data-test", "remove-sauce-labs-bike-light")
      .click();

    cy.get('[data-test="shopping-cart-link"]')
      .should("have.attr", "data-test", "shopping-cart-link")
      .click();

    cy.url().should("include", "/cart.html");
  });
});
