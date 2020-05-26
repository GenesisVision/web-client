import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import { SocialSummaryHashTag } from "gv-api-web";
import { SocialPageTopicsItem } from "pages/social/social/social-page-topics/social-page-topics-item";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./social-page-topics.module.scss";

interface Props {
  topics: SocialSummaryHashTag[];
}

const _SocialPageTopicsBlock: React.FC<Props> = ({ topics }) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock wide solid>
      <Row>
        <h2>{t("Hot topics")}</h2>
      </Row>
      <Row large onlyOffset className={styles["social-page-topics"]}>
        {topics.map(({ hashTag, impressionsCount, discussCount }) => (
          <>
            <Row>
              <SocialPageTopicsItem
                hashTag={hashTag}
                impressionsCount={impressionsCount}
                discussCount={discussCount}
              />
            </Row>
            <Row>
              <Separator />
            </Row>
          </>
        ))}
      </Row>
    </DefaultBlock>
  );
};

export const SocialPageTopicsBlock = React.memo(_SocialPageTopicsBlock);
