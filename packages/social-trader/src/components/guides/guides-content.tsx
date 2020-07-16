import DetailsBlock from "components/details/details-block";
import GVButton from "components/gv-button";
import { Guide } from "gv-api-web";
import React from "react";

import styles from "./guides.container.module.scss";

interface Props {
  guide: Guide;
}

const _GuidesContent: React.FC<Props> = ({ guide }) => (
  <DetailsBlock className={styles["guides-container__content"]}>
    <h3>{guide.name}</h3>
    <>{guide.content}</>
    <GVButton isSuccessful={guide.isPassed}>I've done!</GVButton>
    <GVButton>Next</GVButton>
  </DetailsBlock>
);

const GuidesContent = React.memo(_GuidesContent);
export default GuidesContent;
