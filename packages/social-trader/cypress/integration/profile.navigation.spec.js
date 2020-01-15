/// <reference types="Cypress" />

export const PROFILE = "profile";
export const PROFILE_ROUTE = `/${PROFILE}`;
export const SETTINGS = "settings";
export const SETTINGS_ROUTE = `${PROFILE_ROUTE}/${SETTINGS}`;
export const PASSWORD = "password";
export const PASSWORD_ROUTE = `${PROFILE_ROUTE}/${PASSWORD}`;
export const VERIFY = "verify";
export const KYC_ROUTE = `${PROFILE_ROUTE}/${VERIFY}`;
export const SOCIAL_LINKS = "social-links";
export const SOCIAL_LINKS_ROUTE = `${PROFILE_ROUTE}/${SOCIAL_LINKS}`;
export const SECURITY = "security";
export const SECURITY_ROUTE = `${PROFILE_ROUTE}/${SECURITY}`;
export const REFERRAL_PROGRAM = "referral-program";
export const REFERRAL_PROGRAM_ROUTE = `${PROFILE_ROUTE}/${REFERRAL_PROGRAM}`;

const pages = [
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  PASSWORD_ROUTE,
  KYC_ROUTE,
  SOCIAL_LINKS_ROUTE,
  SECURITY_ROUTE,
  REFERRAL_PROGRAM_ROUTE
];

context("Profile navigation", () => {
  for (const page of pages) {
    xit(`Open ${page} page`, () => {
      cy.visit(page, {
        timeout: 50000, // increase total time for the visit to resolve
        onBeforeLoad(contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === "object").to.be.true;
        },
        onLoad(contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === "object").to.be.true;
        }
      });
    });
  }
});
