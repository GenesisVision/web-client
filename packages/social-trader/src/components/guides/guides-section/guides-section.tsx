import GuideBlock from "components/guides/guide-block/guide-block";
import GuidesNav from "components/guides/guides-nav/guides-nav";
import {
  getAllGuides,
  getCurrentGuide,
  getPrevNextGuides
} from "components/guides/guides.helpers";
import { TNavGuide } from "pages/guides/guides.static-data";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./guides-section.module.scss";

interface Props {
  navGuides: TNavGuide[];
}

const _GuidesSection: React.FC<Props> = ({ navGuides }) => {
  const { tab } = useHashTab("");
  const [t] = useTranslation();
  const allGuides = getAllGuides(navGuides);
  const currentGuide = getCurrentGuide(allGuides, tab);
  const { prevGuide, nextGuide } = getPrevNextGuides(allGuides, currentGuide);

  return (
    <section className={styles["guides-section"]}>
      <h1 className={styles["guides-section__title"]}>{t("guides:title")}</h1>
      <GuidesNav
        navGuides={navGuides}
        currentId={currentGuide && currentGuide.id}
      />
      {currentGuide && (
        <GuideBlock
          guide={currentGuide}
          prevGuide={prevGuide}
          nextGuide={nextGuide}
        />
      )}
    </section>
  );
};

const GuidesSection = React.memo(_GuidesSection);
export default GuidesSection;
