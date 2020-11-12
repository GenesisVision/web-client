import { Button } from "components/button/button";
import { DefaultBlock } from "components/default.block/default.block";
import GuideBlockLink from "components/guides/guide-block/guide-block-link";
import { TGuide } from "pages/guides/guides.static-data";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./guide-block.module.scss";

interface Props {
  guide: TGuide;
  prevGuideName?: string;
  nextGuideName?: string;
}

const _GuideBlock: React.FC<Props> = ({
  guide,
  nextGuideName,
  prevGuideName
}) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock size={"xlarge"} solid className={styles["guide-block"]}>
      <h3 className={styles["guide-block__subtitle"]}>{guide.name}</h3>
      <div className={styles["guide-block__content"]}>{guide.content}</div>
      <div className={styles["guide-block__controls"]}>
        {prevGuideName && (
          <GuideBlockLink guideCanonicalName={prevGuideName}>
            {t("guides:controls.back")}
          </GuideBlockLink>
        )}
        <Button className={styles["guide-block__button"]}>
          {t("guides:controls.done")}
        </Button>
        {nextGuideName && (
          <GuideBlockLink guideCanonicalName={nextGuideName} isNext>
            {t("guides:controls.next")}
          </GuideBlockLink>
        )}
      </div>
    </DefaultBlock>
  );
};

const GuideBlock = React.memo(_GuideBlock);
export default GuideBlock;
