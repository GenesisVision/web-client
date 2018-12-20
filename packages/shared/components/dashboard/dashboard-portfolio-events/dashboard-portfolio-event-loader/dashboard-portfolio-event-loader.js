import React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const PortfolioEventLoader = () => {
  return (
    <div className="portfolio-event">
      <div style={{ width: 252 }}>
        <SvgLoader
          height="84"
          width="252"
        >
          <rect x="65" y="20.87" rx="3" ry="3" width="164.27" height="10" />
          <rect x="65" y="1" rx="3" ry="3" width="85" height="10" />
          <rect x="65" y="69.16" rx="3" ry="3" width="122.5" height="10" />
          <rect x="65" y="43.25" rx="3" ry="3" width="181.1" height="10" />
          <circle cx="18" cy="32" r="14" />
        </SvgLoader>
      </div>
    </div>
  );
};

export default PortfolioEventLoader;
