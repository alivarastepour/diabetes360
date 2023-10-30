import { getTestElement } from "../fixtures/util";

// describe("general tests", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });
//   it("main logo should exist and upon a click should navigate to homepage.", () => {
//     cy.get(getTestElement("div", "main-logo"))
//       .should("contain.text", "Diabetes360")
//       .click();
//     cy.location("pathname").should("eq", "/");
//   });
//   it("test button should navigate to its corresponding path.", () => {
//     cy.get(getTestElement("div", "take-test-wrapper")).click();
//     cy.location("pathname").should("eq", "/RiskAssessment");
//   });
// });

// describe("small screen tests", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//     cy.viewport(499, 900);
//   });
//   it("navbar should be wrapped inside hamburger icon. upon click, hamburger menu should toggle visibility.", () => {
//     cy.get(getTestElement("div", "hamburger-menu-wrapper")).click();
//     cy.get(getTestElement("div", "hamburger-menu-content"));
//     cy.get(getTestElement("div", "hamburger-menu-wrapper")).click();
//     cy.get(getTestElement("div", "hamburger-menu-content")).should("not.exist");
//   });
//   it("hamburger icon should form a cross when clicked for open", () => {
//     cy.get(getTestElement("div", "hamburger-menu-wrapper"))
//       .click()
//       .children()
//       .eq(1)
//       .should("have.css", "display", "none");
//   });
//   it("background repeat should have the value 'repeat'.", () => {
//     cy.get(getTestElement("div", "hero-background")).should(
//       "have.css",
//       "background-repeat",
//       "repeat"
//     );
//   });
//   it("background should be blurry.", () => {
//     cy.get(getTestElement("div", "hero-background")).should(
//       "not.have.css",
//       "filter",
//       ""
//     );
//   });
//   it("prevention section should be scrollable.", () => {
//     cy.get(getTestElement("div", "how-slider-wrapper"))
//       .should("not.have.css", "scroll", "hidden")
//       .should("have.css", "scroll-snap-type");
//   });
// });

describe("assessment introduction dialog tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/RiskAssessment");
  });
  it("test mode dialog should be open", () => {
    cy.get(getTestElement("div", "test-intro-wrapper"))
      .should("have.css", "position", "absolute")
      .children()
      .should("have.length", 4);
  });
  it("dialog backdrop should be in the DOM.", () => {
    cy.get(getTestElement("div", "test-intro-backdrop")).should(
      "not.have.css",
      "backdrop-filter",
      ""
    );
  });
  it("test mode should toggle after a click", () => {
    cy.get(getTestElement("div", "toggle-indicator")).should(
      "have.css",
      "background-color",
      "rgb(204, 204, 204)"
    );
    cy.get(getTestElement("div", "test-intro-select")).click();
    cy.get(getTestElement("div", "toggle-indicator")).should(
      "not.have.css",
      "background-color",
      "rgb(204, 204, 204)"
    );
  });
  it("test mode dialog should close after 'start' button is pushed.", () => {
    cy.get(getTestElement("button", "start-test")).click();
    cy.get(getTestElement("div", "test-intro-wrapper"))
      .should("have.css", "visibility", "hidden")
      .should("have.css", "display", "none")
      .should("have.css", "opacity", "0");
    cy.get(getTestElement("button", "start-test")).should("be.hidden");
  });
});
