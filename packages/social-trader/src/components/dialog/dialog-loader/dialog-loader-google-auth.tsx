import "../dialog.scss";

import { DialogButtons } from "components/dialog/dialog-buttons";
import * as React from "react";

import {
  DialogLoaderHeaderGoogleAuth,
  DialogLoaderImage,
  DialogLoaderInput,
  DialogLoaderShortButton,
  DialogLoaderShortStat
} from "./dialog-loader-elements";

export const DialogLoaderGoogleAuthDesktop: React.FC = () => (
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
          <DialogLoaderInput />
        </div>
      </div>
      <div className="google-auth__step">
        <DialogLoaderShortStat />
        <div className="dialog__wrapper">
          <DialogLoaderInput />
        </div>
        <div className="dialog__wrapper">
          <DialogLoaderInput />
        </div>
        <DialogButtons>
          <DialogLoaderShortButton />
        </DialogButtons>
      </div>
    </div>
  </div>
);

export const DialogLoaderGoogleAuthMobile: React.FC = () => (
  <div className="google-auth google-auth--mobile">
    <DialogLoaderGoogleAuthFirstStep />
  </div>
);

const DialogLoaderGoogleAuthFirstStep: React.FC = () => (
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
