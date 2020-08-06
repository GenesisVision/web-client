import DetailsBlock from "components/details/details-block";
import GuidesList from "components/guides/guides-list/guides-list";
import { GuidesCategory } from "gv-api-web";
import React from "react";

import styles from "./guides-nav.module.scss";

interface Props {
  navGuides: GuidesCategory[];
  currentId?: string;
}

const _GuidesNav: React.FC<Props> = ({ navGuides, currentId }) => (
  <nav className={styles["guides-nav"]}>
    {navGuides.map(navGuide => (
      <DetailsBlock
        className={styles["guides-nav__item"]}
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

const GuidesNav = React.memo(_GuidesNav);
export default GuidesNav;
