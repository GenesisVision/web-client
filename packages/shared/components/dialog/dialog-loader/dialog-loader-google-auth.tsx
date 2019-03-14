import "../dialog.scss";

import * as React from "react";

import {
  DialogLoaderHeaderGoogleAuth,
  DialogLoaderImage,
  DialogLoaderShortButton,
  DialogLoaderShortStat,
  DialogLoaderinput
} from "./dialog-loader-elements";

export const DialogLoaderGoogleAuthDesktop = () => (
  <div className="google-auth google-auth--desktop">
    <div className="dialog__header">
      <DialogLoaderHeaderGoogleAuth />
    </div>
    <div className="google-auth__steps">
      <DialogLoaderGoogleAuthFirstStep />
      <div className="google-auth__step google-auth__step--alt-color">
        <DialogLoaderShortStat />
        <div className="dialog__top-wrapper">
          <DialogLoaderImage />
        </div>
        <div className="dialog__top-wrapper">
          <DialogLoaderinput />
        </div>
      </div>
      <div className="google-auth__step">
        <DialogLoaderShortStat />
        <div className="dialog__wrapper">
          <DialogLoaderinput />
        </div>
        <div className="dialog__wrapper">
          <DialogLoaderinput />
        </div>
        <div className="dialog__buttons">
          <DialogLoaderShortButton />
        </div>
      </div>
    </div>
  </div>
);

export const DialogLoaderGoogleAuthMobile = () => (
  <div className="google-auth google-auth--mobile">
    <DialogLoaderGoogleAuthFirstStep />
  </div>
);

const DialogLoaderGoogleAuthFirstStep = () => (
  <div className="google-auth__step">
    <div className="dialog__wrapper">
      <DialogLoaderShortStat />
    </div>
    <div className="dialog__top-wrapper">
      <div className="dialog__wrapper">
        <DialogLoaderShortButton />
      </div>
      <div className="dialog__wrapper">
        <DialogLoaderShortButton />
      </div>
    </div>
  </div>
);
