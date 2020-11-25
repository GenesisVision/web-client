import { DefaultBlock } from "components/default.block/default.block";
import GuidesList from "components/guides/guides-list/guides-list";
import React from "react";

import styles from "./guides-nav.module.scss";

interface Props {
  navGuides: any[];
  currentId?: string;
}

const _GuidesNav: React.FC<Props> = ({ navGuides, currentId }) => (
  <nav className={styles["guides-nav"]}>
    {navGuides.map(navGuide => (
      <DefaultBlock
        solid
        size={"xlarge"}
        className={styles["guides-nav__item"]}
        key={navGuide.name}
      >
        <GuidesList
          name={navGuide.name}
          guides={navGuide.guides}
          currentId={currentId}
        />
      </DefaultBlock>
    ))}
  </nav>
);

const GuidesNav = React.memo(_GuidesNav);
export default GuidesNav;
