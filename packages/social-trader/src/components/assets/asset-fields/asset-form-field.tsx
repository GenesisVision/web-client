import { Center } from "components/center/center";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVProgramPeriod from "components/gv-program-period";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TextInputValues } from "components/text-input-component/text-input-component";
import { Text } from "components/text/text";
import * as React from "react";

import styles from "./asset-form-field.module.scss";

interface Props {
  wide?: boolean;
  isAllowed?: (values: TextInputValues) => boolean;
  max?: number;
  value?: string | null;
  hintContent?: string;
  hintTooltipContent?: string;
  adornment?: string;
  type?: string;
  caption?: string;
  component: React.ComponentType<any>;
  label: string;
  name: string;
  disabled?: boolean;
}

export const _AssetFormField: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({
  wide,
  isAllowed,
  max = 500,
  value,
  name,
  label,
  component,
  caption,
  adornment,
  type,
  hintContent,
  hintTooltipContent,
  disabled
}) => {
  const trimmedLength = (typeof value === "string" ? value : "").trim().length;
  return (
    <div>
      <GVHookFormField
        showCorrect
        wide={wide}
        isAllowed={isAllowed}
        adornment={adornment}
        type={type}
        name={name}
        label={label}
        autoComplete="off"
        component={component}
        disabled={disabled}
      />
      {caption && (
        <Row className={styles["asset-form-field__caption"]}>
          <Text muted size={"small"}>
            {caption}
          </Text>
          {trimmedLength > 0 && (
            <Center>
              <RowItem size={"small"}>
                <Text>{trimmedLength}</Text>
              </RowItem>
              <GVProgramPeriod
                start={0}
                end={max}
                value={trimmedLength}
                variant="pie"
              />
            </Center>
          )}
        </Row>
      )}
      {hintContent && (
        <Row>
          <Text muted size={"small"}>
            <Hint
              content={hintContent}
              className={styles["asset-form-field__hint"]}
              vertical={VERTICAL_POPOVER_POS.BOTTOM}
              tooltipContent={hintTooltipContent}
            />
          </Text>
        </Row>
      )}
    </div>
  );
};

const AssetFormField = React.memo(_AssetFormField);
export default AssetFormField;
