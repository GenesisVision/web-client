import React from "react";
import ContentLoader from "react-content-loader";

const ProgramSearchContentLoader = () => {
  return (
    <ContentLoader
      height={90}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      className="program-search-program"
    >
      <rect x="10" y="21" rx="3" ry="3" width="64" height="64" />
      <rect x="90" y="21" rx="0" ry="0" width="120" height="20" />
      <rect x="90" y="50" rx="0" ry="0" width="60" height="35" />
      <rect x="160" y="50" rx="0" ry="0" width="60" height="35" />
      <rect x="230" y="50" rx="0" ry="0" width="60" height="35" />
      <rect x="300" y="50" rx="0" ry="0" width="66" height="35" />
    </ContentLoader>
  );
};

export default ProgramSearchContentLoader;
