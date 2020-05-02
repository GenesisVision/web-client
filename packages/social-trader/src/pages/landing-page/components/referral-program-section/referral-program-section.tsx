import { useTranslation } from "i18n";
import { TFunction } from "i18next";
import AdvantagesList from "pages/landing-page/components/advantages-list/advantages-list";
import { refProgItems } from "pages/landing-page/static-data/referral-progs";
import React from "react";

import advantagesStyles from "../advantages-section/advantages-section.module.scss";
import styles from "./referral-program-section.module.scss";

const renderLastItem = (t: TFunction) => (
  <p className={advantagesStyles["advantages-section__text"]}>
    {t("referral-program.text-4")}
  </p>
);

const ReferralProgramSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className={styles["referral-program-section"]}>
      <div className="internal__container">
        <h1 className={styles["referral-program-section__title"]}>
          {t("referral-program.title")}
        </h1>
        <h2 className={styles["referral-program-section__subtitle"]}>
          {t("referral-program.subtitle-1")}
        </h2>
        <AdvantagesList
          advantagesItems={refProgItems}
          className={styles["referral-program-section__adv-list"]}
          lastItem={renderLastItem(t)}
        />
        <h2 className={styles["referral-program-section__subtitle"]}>
          {t("referral-program.subtitle-2")}
        </h2>
        <div className={styles["referral-program-section__img"]} />
      </div>
      <div className={styles["referral-program-section__wrapper"]}>
        <div className="internal__container">
          <div className={styles["referral-program-section__list"]}>
            <h3>{t("referral-program.title-list-1")}</h3>
            <ul className="internal__list">
              <li className="internal__list-item">
                {t("referral-program.text-list-1")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-2")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-3")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-4")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-5")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-6")}
              </li>
            </ul>
          </div>
          <div className={styles["referral-program-section__list"]}>
            <h3>{t("referral-program.title-list-2")}</h3>
            <ul className="internal__list">
              <li className="internal__list-item">
                {t("referral-program.text-list-7")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-8")}
              </li>
              <li className="internal__list-item">
                {t("referral-program.text-list-9")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;
