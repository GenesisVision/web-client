import "./lp-footer.scss";

import * as React from "react";
import AppList from "routes/ssr/landing-page/components/app-list/app-list";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import SeoList from "routes/ssr/landing-page/components/seo-links/seo-list";
import { appLinks } from "routes/ssr/landing-page/routes/app";
import { EMAIL_ROUTE, navFooter } from "routes/ssr/landing-page/routes/nav";

const LPFooter: React.FC = () => {
  return (
    <footer id="contacts" className="lp-footer">
      <div className="lp-footer__row">
        <h3 className="lp-footer__title">Have a question?</h3>
        <div className="lp-footer__email">
          <LPButton color="secondary" href={EMAIL_ROUTE}>
            SEND
          </LPButton>
        </div>
        <div className="lp-footer__app-links">
          <h3 className="lp-footer__subtitle">Get Our mobile app</h3>
          <AppList appItems={appLinks} />
        </div>
        <SeoList seoItems={navFooter} className="lp-footer__seo-links" />
      </div>
    </footer>
  );
};

export default LPFooter;
