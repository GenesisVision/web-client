import ImageBase from "components/avatar/image-base";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./details-structure-blocks.module.scss";

export const DetailsStatisticContainer: React.FC = ({ children }) => {
  return (
    <div className={styles["details-statistic-container"]}>{children}</div>
  );
};
export const DetailsPerformanceData: React.FC = ({ children }) => {
  return (
    <StatisticItemList className={styles["performance-data"]}>
      {children}
    </StatisticItemList>
  );
};

export const DetailsBroker: React.FC<{
  name?: string;
  logoUrl: string;
}> = ({ name, logoUrl }) => {
  return (
    <ImageBase alt={name} className={styles["details-broker"]} src={logoUrl} />
  );
};

const _DetailsStrategy: React.FC<{
  description: string;
  title?: string;
}> = ({ description, title }) => {
  const [t] = useTranslation();
  const descriptionTitle =
    title || t("program-details-page.description.strategy");
  return (
    <>
      <h4>{descriptionTitle}</h4>
      <Row className={styles["details-description-text"]}>
        <MutedText noWrap={false}>{description}</MutedText>
      </Row>
    </>
  );
};

export const DetailsStrategy = React.memo(_DetailsStrategy);
