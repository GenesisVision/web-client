import { useTranslation } from "i18n";
import IconList from "pages/landing-page/components/icon-list/icon-list";
import { socialLinks } from "pages/landing-page/static-data/social-links";
import React from "react";

import styles from "./social-container.module.scss";

const SocialContainer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["social-container"]}>
      <div className={styles["social-container__item"]}>
        <h2 className={styles["social-container__title"]}>
          {t("landing-page:social.title")}
        </h2>
        <IconList
          items={socialLinks}
          className={styles["social-container__list"]}
        />
      </div>
    </div>
  );
};

export default SocialContainer;
