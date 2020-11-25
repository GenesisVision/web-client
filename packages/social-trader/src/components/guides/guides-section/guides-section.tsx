import GuideBlock from "components/guides/guide-block/guide-block";
import GuidesNav from "components/guides/guides-nav/guides-nav";
import { IPrevNextGuidesNamesProps } from "components/guides/guides.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./guides-section.module.scss";

interface Props {
  navGuides: any[];
  currentGuide?: any;
  prevNextGuidesNames: IPrevNextGuidesNamesProps;
  onClickPass: (id: string) => void;
}

const _GuidesSection: React.FC<Props> = ({
  navGuides,
  currentGuide,
  prevNextGuidesNames,
  onClickPass
}) => {
  const [t] = useTranslation();

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
          onClickPass={onClickPass}
          prevGuideName={prevNextGuidesNames.prev}
          nextGuideName={prevNextGuidesNames.next}
        />
      )}
    </section>
  );
};

const GuidesSection = React.memo(_GuidesSection);
export default GuidesSection;
