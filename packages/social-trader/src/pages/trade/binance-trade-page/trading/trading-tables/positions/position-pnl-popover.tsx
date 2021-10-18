import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { RadioButton } from "components/radio-button/radio-button";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { BinanceWorkingType } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import { StyledTh } from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  workingType: BinanceWorkingType;
  setWorkingType: (type: BinanceWorkingType) => void;
}

export const PositionPNLPopover: React.FC<Props> = ({
  workingType,
  setWorkingType
}) => {
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        vertical={VERTICAL_POPOVER_POS.TOP}
        horizontal={HORIZONTAL_POPOVER_POS.CENTER}
      >
        <TooltipContent>
          <Row>
            {t(`trade:positions.table.tooltip.pnl`, {
              price: workingType === "Contract" ? "Last" : "Mark"
            })}
          </Row>
          <Row size={"small"}>
            <Text muted>Select Price Basis</Text>
          </Row>
          <Row size={"small"}>
            <RowItem>
              <RadioButton
                selected={workingType === "Mark"}
                onClick={() => setWorkingType("Mark")}
                label={t("Mark Price")}
              />
            </RowItem>
            <RowItem>
              <RadioButton
                selected={workingType === "Contract"}
                onClick={() => setWorkingType("Contract")}
                label={t("Last Price")}
              />
            </RowItem>
          </Row>
        </TooltipContent>
      </Popover>
      <StyledTh onClick={setAnchor} style={{ cursor: "pointer" }}>
        <Text muted>{t(`trade:positions.table.pnl`)}</Text>
      </StyledTh>
    </>
  );
};
