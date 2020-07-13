import useApiRequest from "hooks/api-request.hook";
import ReallocateField, {
  IReallocateFieldProps
} from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field";
import { getTradingAssets } from "pages/invest/funds/fund-settings/reallocation/services/reallocate.services";
import React, { useCallback } from "react";

const _ReallocateFieldWrapper: React.FC<Props> = props => {
  const { setFieldValue, name } = props;

  const { data: tradingAssets } = useApiRequest({
    request: getTradingAssets,
    fetchOnMount: true
  });

  const onChange = useCallback(
    (e: any) => {
      setFieldValue(name, e.target.value, true);
    },
    [setFieldValue]
  );

  if (!tradingAssets) return null;

  return (
    <ReallocateField
      {...props}
      tradingAssets={tradingAssets}
      onChange={onChange}
    />
  );
};

interface Props extends IReallocateFieldProps {
  [key: string]: any;
}

export const ReallocateFieldWrapper = React.memo(_ReallocateFieldWrapper);
