import "../dialog.scss";

import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

export const DialogLoaderHeader: React.FC = () => (
  <SvgLoader height={57} width={150}>
    <rect x="0" y="0" width="150" height="26" rx="8" ry="8" />
    <rect x="0" y="39" width="100" height="18" rx="8" ry="8" />
  </SvgLoader>
);

export const DialogLoaderStat: React.FC = () => (
  <SvgLoader height={56} width={200}>
    <rect x="0" y="0" width="200" height="18" rx="8" ry="8" />
    <rect x="0" y="30" width="180" height="26" rx="8" ry="8" />
  </SvgLoader>
);

export const DialogLoaderInput: React.FC = () => (
  <SvgLoader height={65} width={296}>
    <rect x="0" y="0" width="100" height="16" rx="8" ry="8" />
    <rect x="0" y="30" width="296" height="35" rx="8" ry="8" />
  </SvgLoader>
);

export const DialogLoaderButton: React.FC = () => (
  <SvgLoader height={42} width={296}>
    <rect x="0" y="0" width="296" height="42" rx="26" ry="26" />
  </SvgLoader>
);

export const DialogLoaderHeaderGoogleAuth: React.FC = () => (
  <SvgLoader height={57} width={350}>
    <rect x="0" y="0" width="350" height="26" rx="8" ry="8" />
    <rect x="0" y="39" width="100" height="18" rx="8" ry="8" />
  </SvgLoader>
);

export const DialogLoaderShortStat: React.FC = () => (
  <SvgLoader height={56} width={140}>
    <rect x="0" y="0" width="50" height="16" rx="8" ry="8" />
    <rect x="0" y="30" width="140" height="26" rx="8" ry="8" />
  </SvgLoader>
);

export const DialogLoaderShortButton: React.FC = () => (
  <SvgLoader height={42} width={150}>
    <rect x="0" y="0" width="150" height="42" rx="26" ry="26" />
  </SvgLoader>
);

export const DialogLoaderImage: React.FC = () => (
  <SvgLoader height={180} width={180}>
    <rect x="0" y="0" width="180" height="180" rx="8" ry="8" />
  </SvgLoader>
);
