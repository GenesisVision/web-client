import DetailsBlock from "components/details/details-block";
import GuidesList from "components/guides/guides-list";
import { GuidesCategory } from "gv-api-web";
import React from "react";

import styles from "./guides.container.module.scss";

interface Props {
  navGuides: GuidesCategory[];
  currentId?: string;
}

const _GuidesNavList: React.FC<Props> = ({ navGuides, currentId }) => (
  <nav className={styles["guides-container__nav"]}>
    {navGuides.map(navGuide => (
      <DetailsBlock
        className={styles["guides-container__nav-item"]}
        horizontalPaddings
        tablet
        key={navGuide.name}
      >
        <GuidesList
          name={navGuide.name}
          guides={navGuide.guides}
          currentId={currentId}
        />
      </DetailsBlock>
    ))}
  </nav>
);

const GuidesNavList = React.memo(_GuidesNavList);
export default GuidesNavList;
