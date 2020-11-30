import SocialLinkImage from "components/avatar/social-link/social-link";
import { Button } from "components/button/button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { SocialLinkViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { TOnEditLinkSubmitFunc } from "pages/profile/social-links/components/social-links.container";
import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";
import { transition } from "utils/style/mixins";
import { object, string } from "yup";

enum FORM_FIELD {
  value = "value"
}

interface Props {
  errorMessage?: string;
  socialLink: SocialLinkViewModel;
  onSubmit: TOnEditLinkSubmitFunc;
}

interface ISignalLinkFormValues {
  [FORM_FIELD.value]: string;
}

const Container = styled(Row)`
  align-items: flex-start;
  ${transition("height")};
  height: auto;
`;

const InputWrapper = styled.div`
  min-width: 150px;
  width: 100%;
`;

const _SocialLinkForm: React.FC<Props> = ({
  errorMessage,
  onSubmit,
  socialLink: { logoUrl, name, type, url, value: valueProp }
}) => {
  const [isButtonsVisible, setButtonsVisible, setButtonHidden] = useIsOpen();
  const [t] = useTranslation();
  const form = useForm<ISignalLinkFormValues>({
    defaultValues: {
      [FORM_FIELD.value]: valueProp || ""
    },
    validationSchema: object().shape({
      [FORM_FIELD.value]: string()
        .trim()
        .max(100, t("validations.link-max-length"))
    }),
    mode: "onChange"
  });

  const { setValue, watch } = form;

  const { value } = watch();

  const handleCancelClick = useCallback(() => {
    setValue(FORM_FIELD.value, valueProp || "", true);
    setButtonHidden();
  }, [setValue, valueProp]);

  const handleSubmit = useCallback(
    (values: ISignalLinkFormValues) => {
      return onSubmit({ ...values, type }).then(
        postponeCallback(setButtonHidden)
      );
    },
    [onSubmit, setButtonHidden]
  );

  return (
    <Container>
      <RowItem>
        <SocialLinkImage url={logoUrl} alt={name} />
      </RowItem>
      <RowItem>
        <HookForm resetOnSuccess form={form} onSubmit={handleSubmit}>
          <InputWrapper>
            <GVHookFormField
              component={SimpleTextField}
              type="text"
              name={FORM_FIELD.value}
              label={name}
              adornment={value || isButtonsVisible ? url : ""}
              adornmentPosition="start"
              onClick={() => {
                if (!isButtonsVisible) setButtonsVisible();
              }}
              autoComplete="off"
            />
          </InputWrapper>
          {isButtonsVisible && (
            <Row>
              <RowItem>
                <SubmitButton isSuccessful={!errorMessage}>
                  {t("buttons.save")}
                </SubmitButton>
              </RowItem>
              <RowItem>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleCancelClick}
                >
                  {t("buttons.cancel")}
                </Button>
              </RowItem>
            </Row>
          )}
        </HookForm>
      </RowItem>
    </Container>
  );
};

const SocialLinkForm = React.memo(_SocialLinkForm);
export default SocialLinkForm;
