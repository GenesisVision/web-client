import { Button } from "components/button/button";
import { DefaultBlock } from "components/default.block/default.block";
import GuideBlockLink from "components/guides/guide-block/guide-block-link";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { IGuide } from "pages/guides/guides.static-data";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./guide-block.module.scss";

export type IPrevNextGuide = {
  link: string;
  name: string;
};

interface Props {
  guide: IGuide;
  prevGuide: IPrevNextGuide | null;
  nextGuide: IPrevNextGuide | null;
}

const _GuideBlock: React.FC<Props> = ({
  guide: { name, content, linkInfo },
  nextGuide,
  prevGuide
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  return (
    <DefaultBlock size={"xlarge"} solid className={styles["guide-block"]}>
      <h2 className={styles["guide-block__subtitle"]}>{name}</h2>
      <div className={styles["guide-block__content"]}>{content}</div>
      <div className={styles["guide-block__controls"]}>
        {prevGuide && (
          <GuideBlockLink guideLink={prevGuide.link} guideName={prevGuide.name}>
            {t("guides:controls.back")}
          </GuideBlockLink>
        )}
        {linkInfo && (
          <Link to={linkCreator(linkInfo.link)}>
            <Button
              className={styles["guide-block__button"]}
              size={"middle"}
              color="primary"
            >
              {linkInfo.label}
            </Button>
          </Link>
        )}
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
