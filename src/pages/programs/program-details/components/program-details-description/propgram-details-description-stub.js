import { GVColors } from "gv-react-components";
import React from "react";
import ContentLoader from "react-content-loader";

const ProgramDetailsDescriptionStub = ({ props }) => {
  return (
    <ContentLoader
      height={300}
      width={700}
      speed={2}
      primaryColor={GVColors.$textColor}
      secondaryColor={GVColors.$textLightColor}
      {...props}
    >
      <rect x="10" y="21" rx="3" ry="3" width="64" height="64" />
      <rect x="87" y="27.27" rx="0" ry="0" width="100" height="12.01" />
      <rect x="88" y="43.27" rx="0" ry="0" width="63" height="6" />
      <rect x="90" y="91.27" rx="0" ry="0" width="62" height="6" />
      <rect x="88" y="105.27" rx="0" ry="0" width="45.6" height="7.92" />
      <rect x="90" y="155.27" rx="0" ry="0" width="66" height="30" />
      <rect x="170.5" y="159.27" rx="0" ry="0" width="57" height="28" />
      <rect x="245.5" y="155.27" rx="0" ry="0" width="62" height="30" />
      <rect x="194.5" y="161.27" rx="0" ry="0" width="0" height="0" />
      <rect x="143.5" y="103.27" rx="0" ry="0" width="96" height="8" />
      <rect x="253.5" y="102.27" rx="0" ry="0" width="52" height="7" />
      <rect x="319.5" y="102.27" rx="0" ry="0" width="15" height="6" />
      <rect x="351.5" y="102.27" rx="0" ry="0" width="33" height="6" />
      <rect x="88.5" y="117.27" rx="0" ry="0" width="8" height="5" />
      <rect x="105.5" y="116.27" rx="0" ry="0" width="55" height="7" />
      <rect x="178.5" y="117.27" rx="0" ry="0" width="53" height="5" />
      <rect x="249.5" y="118.27" rx="0" ry="0" width="32" height="5" />
      <rect x="292.5" y="117.27" rx="0" ry="0" width="91" height="7" />
      <rect x="90.5" y="125.27" rx="0" ry="0" width="45" height="7" />
      <rect x="148.5" y="125.27" rx="0" ry="0" width="33" height="7" />
      <rect x="91.5" y="198.27" rx="0" ry="0" width="92" height="28" />
      <rect x="200.5" y="207.27" rx="0" ry="0" width="63" height="10" />
    </ContentLoader>
  );
};

export default ProgramDetailsDescriptionStub;
