import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { hideEmail } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

enum FIELDS {
  code = "code",
  email = "email",
  token = "token"
}

const _SecurityVerificationForm: React.FC<Props> = ({
  email,
  token,
  errorMessage,
  onSubmit
}) => {
  const [t] = useTranslation();

  const form = useForm<ISecurityVerificationFormValues>({
    defaultValues: {
      [FIELDS.code]: "",
      [FIELDS.email]: email,
      [FIELDS.token]: token
    },
    validationSchema: object().shape({
      [FIELDS.code]: string()
        .trim()
        // Потом исправить на 6
        .matches(/^\d{3}$/, t("validations.three-factor-6digits"))
        .required(t("validations.three-factor-required"))
    }),
    mode: "onChange"
  });
  const {
    watch,
    formState: { isSubmitting }
  } = form;
  const { code } = watch();

  const [isChecking, setIsChecking] = useIsOpen();

  useEffect(() => {
    // Потом исправить на 6
    if (!isChecking && code.length === 3) {
      checkThreeFactor();
    }
  }, [code, isChecking]);

  const checkThreeFactor = useCallback(() => {
    if (isSubmitting) return;
    setIsChecking();
    onSubmit({ code, email, token });
  }, [isSubmitting, code, email, token]);

  const handleSubmit = useCallback(() => {
    return onSubmit({ code, email, token });
  }, [code, email, token]);

  return (
    <HookForm form={form} onSubmit={handleSubmit}>
      <Row>
        <Text muted>{t("auth:security-verification.text")}</Text>
      </Row>
      <Row size={"xlarge"}>
        <GVHookFormField
          disabled={isSubmitting}
          type="tel"
          name={FIELDS.code}
          label={t("auth:security-verification.input-label")}
          autoComplete="off"
          autoFocus
          component={SimpleTextField}
          format="######"
        />
      </Row>
      <Row>
        <Text muted>
          {t("auth:security-verification.message", {
            email: email ? hideEmail(email) : email
          })}
        </Text>
      </Row>
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}
      <Row size={"large"}>
        <SubmitButton
          checkSubmitted={false}
          // isPending
          // disabled
          // isSuccessful
        >
          {t("auth:security-verification.submit-button-label")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

export interface ISecurityVerificationFormValues {
  [FIELDS.code]: string;
  [FIELDS.email]: string;
  [FIELDS.token]: string;
}

interface Props {
  email: string;
  token: string;
  onSubmit: (values: ISecurityVerificationFormValues) => void;
  errorMessage: string;
  isChecking?: boolean;
}
const SecurityVerificationForm = React.memo(_SecurityVerificationForm);
export default SecurityVerificationForm;
