import "./details-description.scss";

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
      <h4 className="asset-details-description__subheading details-description__subheading">
        {descriptionTitle}
      </h4>
      <div className="asset-details-description__text">{description}</div>
    </>
  );
};

export const DetailsStrategy = React.memo(_DetailsStrategy);
