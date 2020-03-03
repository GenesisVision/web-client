import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Range } from "rc-slider";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _LevelFilterPopover: React.FC<Props> = ({
  t,
  cancel,
  value: valueProp,
  changeFilter
}) => {
  const [value, setValue] = useState<number[]>(valueProp);
  const marks = new Array(7).fill(0).reduce((prev, curr, idx) => {
    prev[idx + 1] = idx + 1;
    return prev;
  }, {});
  const handleChange = useCallback((e: number[]) => setValue(e), []);
  const handleSubmit = useCallback(() => changeFilter && changeFilter(value), [
    value,
    changeFilter
  ]);
  return (
    <PopoverContent className="level-filter">
      <PopoverContentCardBlock>
        <div className="level-filter__slider">
          <Range
            dots
            min={1}
            max={7}
            marks={marks}
            value={value}
            onChange={handleChange}
            pushable={false}
          />
        </div>
        <Row>
          <RowItem>
            <GVButton
              size={GV_BTN_SIZE.BIG}
              noPadding
              variant="text"
              onClick={handleSubmit}
            >
              {t("buttons.apply")}
            </GVButton>
          </RowItem>
          <RowItem>
            <GVButton
              size={GV_BTN_SIZE.BIG}
              noPadding
              variant="text"
              color="secondary"
              onClick={cancel}
            >
              {t("buttons.cancel")}
            </GVButton>
          </RowItem>
        </Row>
      </PopoverContentCardBlock>
    </PopoverContent>
  );
};

interface Props extends WithTranslation {
  value: number[];
  cancel?: () => void;
  changeFilter?: (value: number[]) => void;
}

const LevelFilterPopover = translate()(React.memo(_LevelFilterPopover));
export default LevelFilterPopover;
