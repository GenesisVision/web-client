import InputImage, {
  IImageChangeEvent,
  IInputImageProps
} from "components/form/input-image/input-image";
import React, { useCallback } from "react";

const _InputImageWrapper: React.FC<Props> = props => {
  const { setFieldValue, name } = props;
  const onChange = useCallback((e: IImageChangeEvent) => {
    setFieldValue(name, e.target.value, true);
  }, []);
  return <InputImage {...props} onChange={onChange} />;
};

interface Props extends IInputImageProps {
  [key: string]: any;
}

export const InputImageWrapper = React.memo(_InputImageWrapper);
