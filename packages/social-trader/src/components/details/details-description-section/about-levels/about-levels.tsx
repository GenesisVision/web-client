import Dialog from "components/dialog/dialog";
import withLoader from "decorators/with-loader";
import { LevelInfo } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import styles from "./about-level.module.scss";

const AboutLevelsContent = dynamic(() =>
  import(
    "components/details/details-description-section/about-levels/about-levels-content"
  )
);

interface Props {
  open: boolean;
  onClose: VoidFunction;
  investmentsLimits: LevelInfo[];
  currency: CurrencyEnum;
}

const _AboutLevelsComponent: React.FC<Props> = ({
  open,
  onClose,
  investmentsLimits,
  currency
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={styles["about-levels"]}
      top
    >
      <AboutLevelsContent
        currency={currency}
        investmentsLimits={investmentsLimits}
      />
    </Dialog>
  );
};

const AboutLevelsComponent = withLoader(React.memo(_AboutLevelsComponent));
export default AboutLevelsComponent;
