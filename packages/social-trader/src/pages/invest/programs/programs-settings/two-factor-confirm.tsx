import FormTextField from "components/assets/fields/form-text-field";
import { Button } from "components/button/button";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import ConfirmContainer from "modules/confirm/confirm-container";
import { dispatchProgramDescription } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _TwoFactorConfirm: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    dispatch(dispatchProgramDescription());
    setClose();
  }, []);
  return (
    <SettingsBlock label={t("asset-settings:two-factor-confirm.title")}>
      <FormTextField>
        {t("asset-settings:two-factor-confirm.text")}
      </FormTextField>
      <Row size={"large"} wide>
        <Button color="primary" onClick={setOpen}>
          {t("asset-settings:buttons.two-factor-confirm")}
        </Button>
      </Row>
      <ConfirmContainer
        open={isOpen}
        onClose={setClose}
        onApply={handleOnApply}
        programId={id}
      />
    </SettingsBlock>
  );
};
interface Props {
  id: string;
}

const TwoFactorConfirm = withLoader(React.memo(_TwoFactorConfirm));
export default TwoFactorConfirm;
