import { getTestElement } from "../fixtures/util";

describe("main page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("main logo should exist and upon a click should navigate to homepage.", () => {
    cy.get(getTestElement("div", "main-logo"))
      .should("contain.text", "Diabetes360")
      .click();
    cy.location("pathname").should("eq", "/");
  });
  it("navbar should be wrapped inside hamburger icon when view width is less than 500px. upon click, hamburger menu should toggle visibility.", () => {
    cy.viewport(499, 900);
    cy.get(getTestElement("div", "hamburger-menu-wrapper")).click();
    cy.get(getTestElement("div", "hamburger-menu-content"));
    cy.get(getTestElement("div", "hamburger-menu-wrapper")).click();
    cy.get(getTestElement("div", "hamburger-menu-content")).should("not.exist");
  });
  it("hamburger icon should form a cross when clicked for open", () => {
    cy.viewport(499, 900);
    cy.get(getTestElement("div", "hamburger-menu-wrapper"))
      .click()
      .children()
      .eq(1)
      .should("have.css", "display", "none");
  });
});
