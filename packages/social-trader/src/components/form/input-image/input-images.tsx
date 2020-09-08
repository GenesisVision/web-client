import {
  DropZoneWrapper,
  IDropZoneWrapperProps
} from "components/form/input-image/drop-zone-wrapper";
import { IImageChangeEvent } from "components/form/input-image/input-image";
import { GVHookFormField } from "components/gv-hook-form-field";
import React, { useCallback } from "react";

export enum INPUT_IMAGES_MODE {
  ADD = "ADD",
  REPLACE = "REPLACE"
}

interface IInputImagesProps extends IDropZoneWrapperProps {
  maxImages?: number;
  mode?: INPUT_IMAGES_MODE;
  [key: string]: any;
}

export const InputImages: React.FC<IInputImagesProps> = props => {
  const {
    maxImages = Number.MAX_SAFE_INTEGER,
    setFieldValue,
    name,
    value = [],
    mode = INPUT_IMAGES_MODE.ADD
  } = props;
  const onChange = useCallback(
    (e: IImageChangeEvent) => {
      const validValue = maxImages - value.length;
      const eventImages = e.target.value.slice(0, validValue);
      const newValue =
        mode === INPUT_IMAGES_MODE.ADD
          ? [...value, ...eventImages]
          : e.target.value;
      setFieldValue(name, newValue, true);
    },
    [setFieldValue, name]
  );
  return <DropZoneWrapper {...props} onChange={onChange} />;
};

export const HookFormInputImages: React.FC<IInputImagesProps> = props => {
  return <GVHookFormField {...props} component={InputImages} />;
};
