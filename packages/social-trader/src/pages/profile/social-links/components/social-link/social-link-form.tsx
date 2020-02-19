import "./social-link.scss";

import SocialLinkImage from "components/avatar/social-link/social-link";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SocialLinkViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { TOnEditLinkSubmitFunc } from "pages/profile/social-links/components/social-links.container";
import * as React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getPostponedOnCallback, HookForm } from "utils/hook-form.helpers";
import { object, string } from "yup";

enum FORM_FIELD {
  value = "value"
}

const _SocialLinkForm: React.FC<Props> = ({
  errorMessage,
  onSubmit,
  socialLink: { logo, name, type, url, value: valueProp }
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
        .max(100, t("profile-page.social-links.validation.link-max-length"))
    }),
    mode: "onChange"
  });

  const {
    setValue,
    watch,
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const { value } = watch();

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;

  const handleCancelClick = useCallback(() => {
    setValue(FORM_FIELD.value, valueProp || "", true);
    setButtonHidden();
  }, [setValue, valueProp]);

  const handleSubmit = useCallback(
    (values: ISignalLinkFormValues) => {
      return onSubmit({ ...values, type }).then(
        getPostponedOnCallback(setButtonHidden)
      );
    },
    [onSubmit, setButtonHidden]
  );

  return (
    <div className="social-link">
      <div className="social-logo">
        <SocialLinkImage url={logo} alt={name} />
      </div>
      <HookForm
        resetOnSuccess
        className="social-link__form"
        form={form}
        onSubmit={handleSubmit}
      >
        <GVHookFormField
          component={SimpleTextField}
          wrapperClassName="social-input__wrapper"
          adornmentClassName="social-input__adornment"
          labelClassName="social-input__label"
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
        {isButtonsVisible && (
          <div>
            <GVButton
              type="submit"
              className="social-button"
              isPending={isSubmitting}
              isSuccessful={isSuccessful}
              disabled={disabled}
            >
              {t("buttons.save")}
            </GVButton>
            <GVButton
              color="secondary"
              variant="outlined"
              onClick={handleCancelClick}
            >
              {t("buttons.cancel")}
            </GVButton>
          </div>
        )}
      </HookForm>
    </div>
  );
};

interface Props {
  errorMessage?: string;
  socialLink: SocialLinkViewModel;
  onSubmit: TOnEditLinkSubmitFunc;
}

interface ISignalLinkFormValues {
  [FORM_FIELD.value]: string;
}

const SocialLinkForm = React.memo(_SocialLinkForm);
export default SocialLinkForm;
