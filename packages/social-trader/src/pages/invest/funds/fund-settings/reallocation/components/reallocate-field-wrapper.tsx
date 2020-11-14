import useApiRequest from "hooks/api-request.hook";
import ReallocateField, {
  IReallocateFieldProps
} from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field";
import { getTradingAssets } from "pages/invest/funds/fund-settings/reallocation/services/reallocate.services";
import React, { useCallback } from "react";

const _ReallocateFieldWrapper: React.FC<Props> = props => {
  const { setFieldValue, name } = props;

  const { data: platformAssets } = useApiRequest({
    name: "getTradingAssets",
    cache: true,
    request: getTradingAssets,
    fetchOnMount: true
  });

  const onChange = useCallback(
    (e: any) => {
      setFieldValue(name, e.target.value, true);
    },
    [setFieldValue]
  );

  if (!platformAssets) return null;
  const { assets, providers } = platformAssets;

  return (
    <ReallocateField
      {...props}
      assets={assets}
      providers={providers}
      onChange={onChange}
    />
  );
};

interface Props extends IReallocateFieldProps {
  [key: string]: any;
}

export const ReallocateFieldWrapper = React.memo(_ReallocateFieldWrapper);
