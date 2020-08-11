import { Button } from "components/button/button";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Range } from "components/range/range";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./level-filter.module.scss";

const _LevelFilterPopover: React.FC<Props> = ({
  cancel,
  value: valueProp,
  changeFilter
}) => {
  const [t] = useTranslation();
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
    <PopoverContent className={styles["level-filter"]}>
      <PopoverContentCardBlock>
        <Row onlyOffset>
          <Range
            dots
            min={1}
            max={7}
            marks={marks}
            value={value}
            onChange={handleChange}
            pushable={false}
          />
        </Row>
        <Row>
          <RowItem>
            <Button
              size={"xlarge"}
              noPadding
              variant="text"
              onClick={handleSubmit}
            >
              {t("buttons.apply")}
            </Button>
          </RowItem>
          <RowItem>
            <Button
              size={"xlarge"}
              noPadding
              variant="text"
              color="secondary"
              onClick={cancel}
            >
              {t("buttons.cancel")}
            </Button>
          </RowItem>
        </Row>
      </PopoverContentCardBlock>
    </PopoverContent>
  );
};

interface Props {
  value: number[];
  cancel?: () => void;
  changeFilter?: (value: number[]) => void;
}

const LevelFilterPopover = React.memo(_LevelFilterPopover);
export default LevelFilterPopover;
