import "./details-statistic-loader.scss";

import * as React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const DetailsStatisticsLoader: React.FC = () => (
  <div className="details-statistics-loader">
    <div className="details-statistics-loader__row">
      <DetailsSubheading />
      <DetailsStat />
      <DetailsStat />
      <DetailsSubheading />
      <DetailsStat />
      <DetailsStat />
    </div>
    <div className="details-statistics-loader__row">
      <DetailsSubheading />
      <DetailsStat />
      <DetailsStat />
      <DetailsStat />
      <DetailsStat />
      <DetailsStat />
      <DetailsStat />
    </div>
  </div>
);

const DetailsStat: React.FC = () => (
  <div className="details-statistics-loader__stat">
    <SvgLoader height="44" width="110">
      <rect x="0" y="0" width="110" height="16" rx="8" ry="8" />
      <rect x="0" y="26" width="50" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const DetailsSubheading: React.FC = () => (
  <div className="details-statistics-loader__subheading">
    <SvgLoader height="18" width="230">
      <rect x="0" y="0" width="130" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);
export default DetailsStatisticsLoader;
