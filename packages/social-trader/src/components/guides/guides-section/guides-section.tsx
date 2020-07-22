import GuideBlock from "components/guides/guide-block/guide-block";
import GuidesNav from "components/guides/guides-nav/guides-nav";
import { IPrevNextGuidesNamesProps } from "components/guides/guides.helpers";
import { Guide, GuidesCategory } from "gv-api-web";
import React from "react";

import styles from "./guides-section.module.scss";

interface Props {
  navGuides: GuidesCategory[];
  currentGuide?: Guide;
  prevNextGuidesNames: IPrevNextGuidesNamesProps;
  onClickPass: (id: string) => void;
}

const _GuidesSection: React.FC<Props> = ({
  navGuides,
  currentGuide,
  prevNextGuidesNames,
  onClickPass
}) => {
  return (
    <section className={styles["guides-section"]}>
      <h1 className={styles["guides-section__title"]}>
        Genesis Vision Step By Step Guides
      </h1>
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
