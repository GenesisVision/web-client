import ConfirmContainer from "modules/confirm/confirm-container";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";

import SettingsBlock from "./settings-block";

const _TwoFactorConfirm: React.FC<Props> = ({
  id,
  t,
  service: { dispatchAssetDescription }
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <SettingsBlock
      label={t("manager.asset-settings.two-factor-confirm.title")}
      content={
        <>
          <p className="asset-settings__text">
            {t("manager.asset-settings.two-factor-confirm.text")}
          </p>
          <GVButton color="primary" onClick={setOpen}>
            {t("manager.asset-settings.buttons.two-factor-confirm")}
          </GVButton>
          <ConfirmContainer
            open={isOpen}
            onClose={setClose}
            onApply={() => {
              dispatchAssetDescription();
              setClose();
            }}
            programId={id}
          />
        </>
      }
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  id: string;
}

interface Props extends OwnProps, WithTranslation, DispatchProps {}

const TwoFactorConfirm = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  connect(
    null,
    mapDispatchToProps
  ),
  withLoader,
  translate(),
  React.memo
)(_TwoFactorConfirm);
export default TwoFactorConfirm;
