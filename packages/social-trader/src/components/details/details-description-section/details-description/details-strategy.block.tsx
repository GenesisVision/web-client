import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";

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
      <Row className="asset-details-description__text">
        <MutedText noWrap={false}>{description}</MutedText>
      </Row>
    </>
  );
};

export const DetailsStrategy = React.memo(_DetailsStrategy);
