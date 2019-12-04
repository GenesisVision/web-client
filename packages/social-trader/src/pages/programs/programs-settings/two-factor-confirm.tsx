import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import ConfirmContainer from "modules/confirm/confirm-container";
import { dispatchProgramDescription } from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";

const _TwoFactorConfirm: React.FC<Props> = ({
  id,
  t,
  service: { dispatchProgramDescription }
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <SettingsBlock label={t("program-settings.two-factor-confirm.title")}>
      <p className="program-settings__text">
        {t("program-settings.two-factor-confirm.text")}
      </p>
      <GVButton color="primary" onClick={setOpen}>
        {t("program-settings.buttons.two-factor-confirm")}
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
