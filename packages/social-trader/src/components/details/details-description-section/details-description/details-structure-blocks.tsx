import ImageBase from "components/avatar/image-base";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { Text } from "components/text/text";
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
}> = React.memo(({ name, logoUrl }) => {
  return (
    <ImageBase alt={name} className={styles["details-broker"]} src={logoUrl} />
  );
});

const _DetailsStrategy: React.FC<{
  description: string;
  title?: string;
}> = ({ description, title }) => {
  const [t] = useTranslation();
  const descriptionTitle = title || t("asset-details:description.strategy");
  return (
    <>
      <h4>{descriptionTitle}</h4>
      <Row className={styles["details-description-text"]}>
        <Text muted>{description}</Text>
      </Row>
    </>
  );
};

export const DetailsStrategy = React.memo(_DetailsStrategy);
