import { translate } from "react-i18next";
import React from "react";
import FilterItem from "../../../../../../filter-pane/components/filter-item/filter-item";
import { AVG_PROFIT_FILTER_NAME } from "../../../../../programs.constants";
import { Range, Handle } from "rc-slider";
import { RANGE_FILTER_TYPE } from "../../../../../../filtering/filtering.constants";
import { connect } from "react-redux";

const pointsCount = 4;

const mPointFromSPoint = x => x - 1;
const sPointFromMPoint = x => x + 1;

const sPoints = new Array(pointsCount).fill(0).map((x, idx) => idx);
const mPoints = sPoints.map(mPointFromSPoint);

const mPointValue = x => {
  if (x === 0) return 0;
  const value = Math.pow(10, Math.abs(x));
  return Math.sign(x) * value;
};
const mPointFromMPointValue = x => {
  if (x === 0) return 0;
  const value = Math.abs(Math.log10(Math.abs(x)));
  return Math.sign(x) * value;
};

const sPointValue = x => {
  const gap = 100 / (pointsCount - 1);
  return x * gap;
};
const sPointFromSPointValue = x => {
  const gap = 100 / (pointsCount - 1);
  return x / gap;
};

const mPointFormattedValue = mPointValue => {
  let markFormattedValue = mPointValue;
  if (mPointValue / Math.pow(10, 3) > 1) {
    markFormattedValue = mPointValue / Math.pow(10, 3) + "k";
  }
  return `${markFormattedValue}`;
};

const mPointsValues = mPoints.reduce((prev, curr) => {
  prev[sPointValue(sPointFromMPoint(curr))] = mPointFormattedValue(
    mPointValue(curr)
  );
  return prev;
}, {});

const getSValue = mValue => {
  const minMPoint = Math.floor(mPointFromMPointValue(mValue));
  const minMPointValue = mPointValue(minMPoint);
  const maxMPointValue = mPointValue(minMPoint + 1);
  const rate =
    minMPoint === mValue
      ? 1
      : (mValue - minMPointValue) / (maxMPointValue - minMPointValue);

  const gap = 100 / (pointsCount - 1);
  const minSPoint = sPointFromMPoint(minMPoint);
  return sPointValue(minSPoint) + gap * rate;
};
const getMValue = sValue => {
  const sPoint = sPointFromSPointValue(sValue);
  const minMPoint = mPointFromSPoint(Math.floor(sPoint));
  const rate = sPoint % 1;
  const minMPointValue = mPointValue(minMPoint);
  const maxMPointValue = mPointValue(minMPoint + 1);

  return +(minMPointValue + (maxMPointValue - minMPointValue) * rate).toFixed(
    2
  );
};

const getMValues = ([min, max]) => {
  return [getMValue(min), getMValue(max)];
};

const getSValues = ([min, max] = [undefined, undefined]) => {
  if (min === undefined || max === undefined) return undefined;
  return [getSValue(min), getSValue(max)];
};

const AvgProfitFilter = ({
  t,
  filtering,
  onFilterChange,
  maxValue,
  minValue
}) => {
  const handleFilterChange = value => {
    // const mValues = getMValues(value);
    return onFilterChange(AVG_PROFIT_FILTER_NAME, RANGE_FILTER_TYPE)(value);
  };

  return (
    <FilterItem
      name={t(`programs-filtering.${AVG_PROFIT_FILTER_NAME}.name`)}
      description={t(
        `programs-filtering.${AVG_PROFIT_FILTER_NAME}.description`
      )}
      value={filtering.filters[AVG_PROFIT_FILTER_NAME]}
      defaultValue={[minValue, maxValue]}
      onFilterChange={handleFilterChange}
    >
      {(value, onChange) => (
        <Range
          // marks={mPointsValues}
          value={value}
          onChange={onChange}
          min={minValue}
          max={maxValue}
          pushable
          handle={props => (
            <div key={props.index}>
              <span
                className="gv-hangle__text"
                style={{
                  left: `${props.offset - 5}%`
                }}
              >
                {`${props.value}%`}
              </span>
              <Handle {...props} dragging="false" />
            </div>
          )}
        />
      )}
    </FilterItem>
  );
};

const mapStateToProps = ({
  platformData: {
    settings: { data = {} }
  }
}) => ({
  minValue: data.programsMinAvgProfit,
  maxValue: data.programsMaxAvgProfit
});

export default connect(mapStateToProps)(translate()(AvgProfitFilter));
