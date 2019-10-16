import ConfirmContainer from "modules/confirm/confirm-container";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators, compose } from "redux";
import GVButton from "shared/components/gv-button";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";

const _TwoFactorConfirm: React.FC<Props> = ({
  id,
  t,
  service: { dispatchProgramDescription }
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <SettingsBlock
      label={t("manager.program-settings.two-factor-confirm.title")}
    >
      <p className="program-settings__text">
        {t("manager.program-settings.two-factor-confirm.text")}
      </p>
      <GVButton color="primary" onClick={setOpen}>
        {t("manager.program-settings.buttons.two-factor-confirm")}
      </GVButton>
      <ConfirmContainer
        open={isOpen}
        onClose={setClose}
        onApply={() => {
          dispatchProgramDescription();
          setClose();
        }}
        programId={id}
      />
    </SettingsBlock>
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
