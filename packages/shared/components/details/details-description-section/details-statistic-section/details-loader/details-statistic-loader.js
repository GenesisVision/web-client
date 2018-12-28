import "../details-statistic/details-statistics.scss";

import React, { Fragment } from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const DetailsStatisticsLoader = () => {
  return (
    <Fragment>
      <div className="details-statistics__loader-row">
        <DetailsSubheading />
        <DetailsStat />
        <DetailsStat />
        <DetailsSubheading />
        <DetailsStat />
        <DetailsStat />
      </div>
      <div className="details-statistics__loader-row">
        <DetailsSubheading />
        <DetailsStat />
        <DetailsStat />
        <DetailsStat />
        <DetailsStat />
        <DetailsStat />
        <DetailsStat />
      </div>
    </Fragment>
  );
};

const DetailsStat = () => (
  <div className="details-statistics__loader-stat">
    <SvgLoader height="44" width="110">
      <rect x="0" y="0" width="110" height="16" rx="8" ry="8" />
      <rect x="0" y="26" width="50" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const DetailsSubheading = () => (
  <div className="details-statistics__loader-subheading">
    <SvgLoader height="18" width="230">
      <rect x="0" y="0" width="130" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);
export default DetailsStatisticsLoader;
