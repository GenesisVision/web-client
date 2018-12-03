import React from "react";
import ContentLoader from "react-content-loader";

const PortfolioEventLoader = props => {
  return (
    <div className="portfolio-event">
      <div style={{ width: 252 }}>
        <ContentLoader
          height={84}
          width={252}
          speed={2}
          primaryColor="#8d9397"
          secondaryColor="#5c636a"
          {...props}
        >
          <rect x="65" y="20.87" rx="4" ry="4" width="164.27" height="10" />
          <rect x="65" y="1" rx="3" ry="3" width="85" height="10" />
          <rect x="65" y="69.16" rx="3" ry="3" width="122.5" height="10" />
          <rect x="65" y="43.25" rx="3" ry="3" width="181.1" height="10" />
          <circle cx="18" cy="32" r="14" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default PortfolioEventLoader;
