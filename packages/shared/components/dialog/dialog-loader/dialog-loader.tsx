import "../dialog.scss";

import * as React from "react";
import {
  DialogLoaderButton,
  DialogLoaderHeader,
  DialogLoaderinput,
  DialogLoaderStat
} from "./dialog-loader-elements";

export const DialogLoader = () => (
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
