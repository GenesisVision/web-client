import "./about-level.scss";

import Dialog from "components/dialog/dialog";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { LevelInfo } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { compose } from "redux";
import { CurrencyEnum } from "utils/types";

const AboutLevelsContent = dynamic(() =>
  import(
    "components/details/details-description-section/about-levels/about-levels-content"
  )
);

const _AboutLevelsComponent: React.FC<Props> = ({
  open,
  onClose,
  investmentsLimits,
  currency
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="about-levels" top>
      <AboutLevelsContent
        currency={currency}
        investmentsLimits={investmentsLimits}
      />
    </Dialog>
  );
};

interface Props {
  open: boolean;
  onClose(): void;
  investmentsLimits: LevelInfo[];
  currency: CurrencyEnum;
}

const AboutLevelsComponent = compose<
  React.ComponentType<Props & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_AboutLevelsComponent);
export default AboutLevelsComponent;
