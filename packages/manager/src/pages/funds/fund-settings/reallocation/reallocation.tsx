import {
  CancelablePromise,
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import SettingsBlock from "modules/asset-settings/settings-block";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useErrorMessage from "shared/hooks/error-message.hook";
import { MiddlewareDispatch } from "shared/utils/types";

import ReallocateForm, {
  IReallocateFormValues
} from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

const _Reallocation: React.FC<Props> = ({
  canReallocate,
  onApply,
  platformAssets,
  fundAssets,
  t,
  id,
  service
}) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleApply = useCallback(
    (values: IReallocateFormValues) => {
      service
        .updateAssets(id, values.assets)
        .then(onApply)
        .catch(setErrorMessage);
    },
    [id]
  );
  return (
    <SettingsBlock
      label={t("manager.fund-settings.reallocation.title")}
      content={
        <>
          <ReallocateForm
            canReallocate={canReallocate}
            condition={!!fundAssets.length}
            fundAssets={fundAssets}
            platformAssets={platformAssets}
            onSubmit={handleApply}
            errorMessage={errorMessage}
          />
        </>
      }
    />
  );
};

interface Props extends OwnProps, WithTranslation, DispatchProps {}

interface OwnProps {
  id: string;
  platformAssets: PlatformAsset[];
  fundAssets: FundAssetPartWithIcon[];
  onApply: () => void;
  canReallocate: boolean;
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateAssets: (id: string, assets: FundAssetPart[]) =>
      dispatch(updateAssets(id, assets))
  }
});

interface DispatchProps {
  service: {
    updateAssets: (
      id: string,
      assets: FundAssetPart[]
    ) => CancelablePromise<void>;
  };
}

const Reallocation = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_Reallocation);
export default Reallocation;
