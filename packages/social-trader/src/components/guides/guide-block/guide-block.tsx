import { Button } from "components/button/button";
import { DefaultBlock } from "components/default.block/default.block";
import GuideBlockLink from "components/guides/guide-block/guide-block-link";
import { TGuide } from "pages/guides/guides.static-data";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./guide-block.module.scss";

export type IPrevNextGuide = {
  link: string;
  name: string;
};

interface Props {
  guide: TGuide;
  prevGuide: IPrevNextGuide | null;
  nextGuide: IPrevNextGuide | null;
}

const _GuideBlock: React.FC<Props> = ({ guide, nextGuide, prevGuide }) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock size={"xlarge"} solid className={styles["guide-block"]}>
      <h3 className={styles["guide-block__subtitle"]}>{guide.name}</h3>
      <div className={styles["guide-block__content"]}>{guide.content}</div>
      <div className={styles["guide-block__controls"]}>
        {prevGuide && (
          <GuideBlockLink guideLink={prevGuide.link} guideName={prevGuide.name}>
            {t("guides:controls.back")}
          </GuideBlockLink>
        )}
        <Button className={styles["guide-block__button"]}>
          {t("guides:controls.done")}
        </Button>
        {nextGuide && (
          <GuideBlockLink
            guideLink={nextGuide.link}
            guideName={nextGuide.name}
            isNext
          >
            {t("guides:controls.next")}
          </GuideBlockLink>
        )}
      </div>
    </DefaultBlock>
  );
};

const GuideBlock = React.memo(_GuideBlock);
export default GuideBlock;
