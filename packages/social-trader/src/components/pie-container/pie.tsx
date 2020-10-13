import { PieCircle } from "components/pie-container/pie-circle";
import { PieCircleContainer } from "components/pie-container/pie-circle-container";
import {
  calcDash,
  calcPercent,
  CircleDataType
} from "components/pie-container/pie.helpers";
import * as React from "react";
import { $secondaryBackgroundColor } from "utils/style/colors";

export enum PIE_DIRECTION {
  CLOCKWISE = "CLOCKWISE",
  COUNTERCLOCKWISE = "COUNTERCLOCKWISE"
}

const Pie: React.FC<Props & CircleDataType> = props => {
  const circles: CircleDataType[] = [props];
  return <MultiPie {...props} circles={circles} />;
};

export const MultiPie: React.FC<Props & {
  over?: string;
  circles: CircleDataType[];
}> = ({
  over,
  circles,
  onMouseLeave,
  onMouseOver,
  withSubstrate = true,
  pieDirection = PIE_DIRECTION.CLOCKWISE
}) => {
  const circleSize = 36;
  const circleCenter = circleSize / 2;
  return (
    <PieCircleContainer
      color={circles.length ? circles[0].color : $secondaryBackgroundColor}
      circleSize={circleSize}
      withSubstrate={withSubstrate}
    >
      {circles.map(({ value, start = 0, end, begin = 0, color, name }, i) => {
        const valuePercent = calcPercent(value, start, end);
        const strokeDasharray = calcDash(valuePercent);
        return (
          <PieCircle
            key={i}
            selected={!!over && over === name}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver ? onMouseOver(name) : undefined}
            circleCenter={circleCenter}
            color={color}
            strokeDasharray={strokeDasharray}
            begin={begin}
            pieDirection={pieDirection}
            circleSize={circleSize}
          />
        );
      })}
    </PieCircleContainer>
  );
};

export interface Props {
  onMouseOver?: (name?: string) => VoidFunction;
  onMouseLeave?: VoidFunction;
  withSubstrate?: boolean;
  pieDirection?: PIE_DIRECTION;
}

export default React.memo(Pie);
