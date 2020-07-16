import GuidesContent from "components/guides/guides-content";
import GuidesNavList from "components/guides/guides-nav-list";
import { Guide, GuidesCategory } from "gv-api-web";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React, { useEffect, useState } from "react";
import { safeGetElemFromArray } from "utils/helpers";

import styles from "./guides.container.module.scss";

interface Props {
  navGuides: GuidesCategory[];
}

const getCurrentGuide = (navGuides: GuidesCategory[], tab: string): Guide => {
  const allGuides = navGuides.reduce((acc: Guide[], current) => {
    return [...acc, ...current.guides];
  }, []);
  return safeGetElemFromArray(
    allGuides,
    guide => guide.canonicalName === tab.slice(1, tab.length)
  );
};

const _GuidesContainer: React.FC<Props> = ({ navGuides }) => {
  const { tab } = useHashTab("");
  const [currentGuide, setCurrentGuide] = useState<Guide | undefined>();

  useEffect(() => {
    setCurrentGuide(getCurrentGuide(navGuides, tab));
  }, [navGuides, tab]);
  return (
    <section className={styles["guides-container"]}>
      <h1 className={styles["guides-container__title"]}>
        Genesis Vision Step By Step Guides
      </h1>
      <GuidesNavList
        navGuides={navGuides}
        currentId={currentGuide && currentGuide.id}
      />
      {currentGuide && <GuidesContent guide={currentGuide} />}
    </section>
  );
};

const GuidesContainer = React.memo(_GuidesContainer);
export default GuidesContainer;
