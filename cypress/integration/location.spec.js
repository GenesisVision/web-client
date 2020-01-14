/// <reference types="Cypress" />

const hostname = "blue.genesis.vision";
const investPageRoute = "/invest";
const protocol = "https:";
const origin = `${protocol}//${hostname}`;
const url = `${protocol}//${hostname}${investPageRoute}`;

context("Location", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("cy.hash() - get the current URL hash", () => {
    cy.hash().should("be.empty");
  });

  it("cy.location() - get window.location", () => {
    cy.location().should(location => {
      expect(location.hash).to.be.empty;
      expect(location.href).to.eq(url);
      expect(location.host).to.eq(hostname);
      expect(location.hostname).to.eq(hostname);
      expect(location.origin).to.eq(origin);
      expect(location.pathname).to.eq(investPageRoute);
      expect(location.port).to.eq("");
      expect(location.protocol).to.eq("https:");
      expect(location.search).to.be.empty;
    });
  });

  it("cy.url() - get the current URL", () => {
    cy.url().should("eq", url);
  });
});
