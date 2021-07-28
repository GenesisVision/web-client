import { Text } from "components/text/text";
import { useTranslation } from "i18n";
import IconList from "pages/landing-page/components/icon-list/icon-list";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import SeoList from "pages/landing-page/components/seo-links/seo-list";
import { appLinks } from "pages/landing-page/static-data/app-links";
import {
  EMAIL_ROUTE,
  navFooter
} from "pages/landing-page/static-data/nav-links";
import React from "react";

import styles from "./lp-footer.module.scss";

const LPFooter: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer id="contacts" className={styles["lp-footer"]}>
      <div className={styles["lp-footer__container"]}>
        <div className={styles["lp-footer__row"]}>
          <h3 className={styles["lp-footer__title"]}>
            {t("landing-page:footer.title")}
          </h3>
          <div className={styles["lp-footer__email"]}>
            <a
              title={t("landing-page:footer.email-title")}
              href={EMAIL_ROUTE}
              className={styles["lp-footer__email-link"]}
            >
              {t("landing-page:footer.email-support")}
            </a>
            <LPButton
              className={styles["lp-footer__btn"]}
              color="secondary"
              href={EMAIL_ROUTE}
            >
              {t("landing-page:buttons.send")}
            </LPButton>
          </div>
          <div className={styles["lp-footer__app-links"]}>
            <h3 className={styles["lp-footer__subtitle"]}>
              {t("landing-page:footer.subtitle")}
            </h3>
            <IconList items={appLinks} />
          </div>
          <SeoList
            seoItems={navFooter}
            className={styles["lp-footer__seo-links"]}
          />
          <div className={styles["lp-footer__copyright"]}>
            <Text weight={"bold"}>
              {t("footer.copyright", { dateNow: new Date().getFullYear() })}
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LPFooter;
