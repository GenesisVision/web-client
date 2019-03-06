import "./progress.css";

import * as React from "react";

interface IProgressProps {
  value: number;
  min: number;
  max: number;
  labelMin: string;
  labelMax: string;
}

const Progress: React.FC<IProgressProps> = ({
  value,
  min,
  max,
  labelMin,
  labelMax
}) => {
  const minValue = min || 0;
  const maxValue = max || 100;
  const val = ((value - minValue) / (maxValue - minValue || 1)) * 100;
  const renderLabelMin = (): JSX.Element => {
    if (!labelMin) {
      return null;
    }
    return <div>{labelMin}</div>;
  };
  const renderLabelMax = (): JSX.Element => {
    if (!labelMax) {
      return null;
    }
    return <div>{labelMax}</div>;
  };
  return (
    <div className="gv-progress">
      {renderLabelMin()}
      <div className="gv-progress__container">
        <div className="gv-progress__value" style={{ width: `${val}%` }} />
      </div>
      {renderLabelMax()}
    </div>
  );
};

export default Progress;
