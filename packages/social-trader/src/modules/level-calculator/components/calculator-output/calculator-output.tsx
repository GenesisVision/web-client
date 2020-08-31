import { Center } from "components/center/center";
import {
  $mainColor,
  $panelBackgroundColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeSmall, $paddingSmall } from "components/gv-styles/gv-sizes";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import withLoader from "decorators/with-loader";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/style-mixins";

interface Props {
  label: string;
  value: string | React.ReactNode;
  tooltipContent?: string;
}

const Label = styled(Center)`
  ${fontSize($fontSizeSmall)};
  color: #e6edf1;
`;

const Value = styled.div`
  font-weight: bold;
  ${fontSize(15)};
  display: inline-block;
  padding: 6px 22px;
  background-color: ${$panelBackgroundColor}a1;
  border-radius: 4px;
  color: ${$mainColor};
`;

const Container = styled.div`
  min-width: 260px;
  margin-bottom: ${$paddingSmall}px;
`;

const _CalculatorOutput: React.FC<Props> = ({
  label,
  value,
  tooltipContent
}) => {
  return (
    <Container>
      <LabeledValue
        label={
          <Label>
            <RowItem size={"small"}>{label}</RowItem>
            {tooltipContent && (
              <RowItem>
                <TooltipLabel tooltipContent={tooltipContent} />
              </RowItem>
            )}
          </Label>
        }
      >
        <Value>{value}</Value>
      </LabeledValue>
    </Container>
  );
};

const CalculatorOutput = React.memo(withLoader(_CalculatorOutput));
export default CalculatorOutput;
