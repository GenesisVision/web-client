import "./details-description.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";

const _DetailsStrategy: React.FC<{
  description: string;
}> = ({ description }) => {
  const [t] = useTranslation();
  return (
    <>
      <h4 className="asset-details-description__subheading details-description__subheading">
        {t("program-details-page.description.strategy")}
      </h4>
      <div className="asset-details-description__text">{description}</div>
    </>
  );
};

export const DetailsStrategy = React.memo(_DetailsStrategy);
