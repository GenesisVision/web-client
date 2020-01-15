/// <reference types="Cypress" />

export const INVEST = "invest";
export const INVEST_ROUTE = `/${INVEST}`;

export const SETTINGS = `settings`;
export const FACETS = "facets";
export const FAVORITES_TAB_NAME = "favorites";
export const EXPLORE_TAB_NAME = "";

export const FOLLOW = "follow";
export const GV_FOLLOW_ROUTE = `${INVEST_ROUTE}/${FOLLOW}`;

export const FUND = "fund";
export const FUNDS = `${FUND}s`;
export const GV_FUNDS_ROUTE = `${INVEST_ROUTE}/${FUNDS}`;

export const PROGRAM = "program";
export const PROGRAMS = `${PROGRAM}s`;
export const GV_PROGRAMS_ROUTE = `${INVEST_ROUTE}/${PROGRAMS}`;

const pages = [GV_FOLLOW_ROUTE, GV_FUNDS_ROUTE, GV_PROGRAMS_ROUTE];

context("Invest navigation", () => {
  describe("Open invest pages", () => {
    it(`Open ${INVEST_ROUTE} page`, () => {
      cy.visit(INVEST_ROUTE);
      cy.get(".asset-block").should("be.not.undefined");
    });
    for (const page of pages) {
      it(`Open ${page} page`, () => {
        cy.visit(page);
        cy.get(".facets__wrapper").should("be.not.undefined");
        cy.get(".table-wrapper").should("be.not.undefined");
        cy.get(".table__toolbar").should("be.not.undefined");
        cy.get(".table__scroll").should("be.not.undefined");
        cy.get(".table__footer").should("be.not.undefined");
        cy.get(".facet__title")
          .contains("New")
          .should("be.not.undefined");
        cy.get(".facet__title")
          .contains("Top")
          .should("be.not.undefined");
        cy.get(".facet__title")
          .contains("Popular")
          .should("be.not.undefined");
        if (page === GV_PROGRAMS_ROUTE)
          cy.get(".facet__title")
            .contains("Rating")
            .should("be.not.undefined");
        else
          cy.get(".facet__title")
            .contains("Weekly top")
            .should("be.not.undefined");
      });
    }
  });
});
