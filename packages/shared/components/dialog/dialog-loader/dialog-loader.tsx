import "../dialog.scss";

import * as React from "react";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";

import {
  DialogLoaderButton,
  DialogLoaderHeader,
  DialogLoaderInput,
  DialogLoaderStat
} from "./dialog-loader-elements";

export const DialogLoader: React.FC = () => (
  <React.Fragment>
    <div className="dialog__top">
      <DialogLoaderHeader />
      <DialogField>
        <DialogLoaderStat />
      </DialogField>
    </div>
    <DialogBottom>
      <div className="dialog__wrapper">
        <DialogLoaderInput />
      </div>
      <div className="dialog__wrapper">
        <DialogLoaderInput />
      </div>
      <DialogButtons>
        <DialogLoaderButton />
      </DialogButtons>
    </DialogBottom>
  </React.Fragment>
);
