import "./dialog.scss";

import * as React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const DialogLoader = () => (
  <React.Fragment>
    <div className="dialog__top">
      <DialogLoaderHeader />
      <div className="dialog-field">
        <DialogLoaderStat />
      </div>
    </div>
    <div className="dialog__bottom">
      <div className="dialog__wrapper">
        <DialogLoaderinput />
      </div>
      <div className="dialog__wrapper">
        <DialogLoaderinput />
      </div>
      <div className="dialog__buttons">
        <DialogLoaderButton />
      </div>
    </div>
  </React.Fragment>
);

const DialogLoaderHeader = () => (
  <SvgLoader height={57} width={150}>
    <rect x="0" y="0" width="150" height="26" rx="8" ry="8" />
    <rect x="0" y="39" width="100" height="18" rx="8" ry="8" />
  </SvgLoader>
);

const DialogLoaderStat = () => (
  <SvgLoader height={56} width={200}>
    <rect x="0" y="0" width="200" height="18" rx="8" ry="8" />
    <rect x="0" y="30" width="180" height="26" rx="8" ry="8" />
  </SvgLoader>
);

const DialogLoaderinput = () => (
  <SvgLoader height={65} width={296}>
    <rect x="0" y="0" width="100" height="16" rx="8" ry="8" />
    <rect x="0" y="30" width="296" height="35" rx="8" ry="8" />
  </SvgLoader>
);

const DialogLoaderButton = () => (
  <SvgLoader height={42} width={296}>
    <rect x="0" y="0" width="296" height="42" rx="26" ry="26" />
  </SvgLoader>
);

export default DialogLoader;
