import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { MiddlewareDispatch, ResponseError } from "shared/utils/types";

import {
  offPayFeesWithGvt,
  onPayFeesWithGvt
} from "../../services/wallet.services";
import WalletSettings from "./wallet-settings";

const _WalletSettingsContainer: React.FC<Props> = ({
  t,
  isPayFeesWithGvt: isPayFeesWithGvtProp,
  service
}) => {
  const [isPending, setIsPending, setNotPending] = useIsOpen();
  const [isOpenGVTFees, setOpenGVTFees, setCloseGVTFees] = useIsOpen();
  const [
    isPayFeesWithGvt,
    setPayFeesWithGvt,
    setNotPayFeesWithGvt,
    setPayFeesWithGvtValue
  ] = useIsOpen(isPayFeesWithGvtProp);
  const handleSwitch = () => {
    const method = isPayFeesWithGvt ? offPayFeesWithGvt : onPayFeesWithGvt;
    setIsPending();
    return method()
      .then(() => {
        setPayFeesWithGvtValue(!isPayFeesWithGvt);
      })
      .catch(({ errorMessage }: ResponseError) => {
        service.alertError(errorMessage);
      })
      .finally(() => setNotPending());
  };
  return (
    <WalletSettings
      name="PayGVTFee"
      label={t("wallet-page.settings.label")}
      isPayFeesWithGvt={isPayFeesWithGvt}
      isPending={isPending}
      handleOpenGVTFees={setOpenGVTFees}
      handleCloseGVTFees={setCloseGVTFees}
      handleSwitch={handleSwitch}
      isOpenGVTFees={isOpenGVTFees}
    />
  );
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    alertError: (message: string) =>
      dispatch(alertMessageActions.error(message))
  }
});

interface Props extends OwnProps, DispatchProps, WithTranslation {}

interface OwnProps {
  isPayFeesWithGvt: boolean;
}

interface DispatchProps {
  service: {
    alertError: (message: string) => void;
  };
}

const WalletSettingsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_WalletSettingsContainer);
export default WalletSettingsContainer;
