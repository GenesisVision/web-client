import ReallocateField, {
  IReallocateFieldProps
} from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field";
import React, { useCallback } from "react";

const _ReallocateFieldWrapper: React.FC<Props> = props => {
  const { setFieldValue, name } = props;
  const onChange = useCallback(
    (e: any) => {
      setFieldValue(name, e.target.value, true);
    },
    [setFieldValue]
  );
  return <ReallocateField {...props} onChange={onChange} />;
};

interface Props extends IReallocateFieldProps {
  [key: string]: any;
}

export const ReallocateFieldWrapper = React.memo(_ReallocateFieldWrapper);
