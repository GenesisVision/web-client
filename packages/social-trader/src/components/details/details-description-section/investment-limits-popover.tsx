import { Button } from "components/button/button";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { LevelInfo } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { fetchInvestmentsLevels } from "pages/invest/programs/program-details/service/program-details.service";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import AboutLevelsComponent from "./about-levels/about-levels";
import styles from "./investment-limits-popover.module.scss";

const _InvestmentLimitsPopover: React.FC<Props> = ({
  level,
  canLevelUp,
  currency,
  limit
}) => {
  const [t] = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const [investmentsLimits, setInvestmentsLimits] = useState<
    LevelInfo[] | undefined
  >(undefined);
  useEffect(() => {
    fetchInvestmentsLevels(currency).then(setInvestmentsLimits);
  }, [currency]);
  return (
    <>
      <PopoverContent className={styles["popover-levels"]}>
        <PopoverContentCardBlock className={styles["popover-levels__block"]}>
          <Row>
            <h4>
              {t("program-details-page:popover.genesis-level")} {level}
            </h4>
          </Row>
          {canLevelUp && (
            <Row>
              <LabeledValue label={t("level-tooltip.level-up")}>
                <Text weight={"bold"}>{t("level-tooltip.top10")}</Text>
              </LabeledValue>
            </Row>
          )}
          <Row>
            <LabeledValue
              label={t("program-details-page:popover.invest-limit")}
            >
              <Text weight={"bold"}>
                <NumberFormat
                  value={formatCurrencyValue(limit, currency)}
                  thousandSeparator={" "}
                  displayType="text"
                  suffix={` ${currency}`}
                />
              </Text>
            </LabeledValue>
          </Row>
        </PopoverContentCardBlock>
        <PopoverContentCardBlock
          dark
          className={styles["popover-levels__block"]}
        >
          <Row>
            <Text muted>{t("program-details-page:popover.text")}</Text>
          </Row>
          <Row>
            <Button
              size={"xlarge"}
              noPadding
              variant="text"
              onClick={setOpen}
              color="secondary"
            >
              <>{t("program-details-page:popover.about-levels")} &#8250;</>
            </Button>
          </Row>
        </PopoverContentCardBlock>
      </PopoverContent>
      <AboutLevelsComponent
        condition={!!investmentsLimits}
        open={isOpen}
        onClose={setClose}
        currency={currency}
        investmentsLimits={investmentsLimits!}
      />
    </>
  );
};

interface Props {
  limit: number;
  currency: CurrencyEnum;
  level: number;
  canLevelUp: boolean;
  closePopover: VoidFunction;
}

const InvestmentLimitsPopover = React.memo(_InvestmentLimitsPopover);
export default InvestmentLimitsPopover;
