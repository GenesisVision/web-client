import "./lp-footer.scss";

import IconList from "pages/landing-page/components/icon-list/icon-list";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import SeoList from "pages/landing-page/components/seo-links/seo-list";
import { appLinks } from "pages/landing-page/static-data/app-links";
import {
  EMAIL_ROUTE,
  navFooter
} from "pages/landing-page/static-data/nav-links";
import React from "react";

const LPFooter: React.FC = () => {
  return (
    <footer id="contacts" className="lp-footer">
      <div className="lp-footer__container">
        <div className="lp-footer__row">
          <h3 className="lp-footer__title">Have a question?</h3>
          <div className="lp-footer__email">
            <a
              title={"Write email to Genesis Vision support"}
              href={EMAIL_ROUTE}
              className="lp-footer__email-link"
            >
              support@genesis.vision
            </a>
            <LPButton color="secondary" href={EMAIL_ROUTE}>
              SEND
            </LPButton>
          </div>
          <div className="lp-footer__app-links">
            <h3 className="lp-footer__subtitle">Get Our mobile app</h3>
            <IconList items={appLinks} />
          </div>
          <SeoList seoItems={navFooter} className="lp-footer__seo-links" />
        </div>
      </div>
    </footer>
  );
};

export default LPFooter;
