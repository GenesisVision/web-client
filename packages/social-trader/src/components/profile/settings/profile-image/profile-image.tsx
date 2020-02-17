import "./profile-image.scss";

import { IImageValue } from "components/form/input-image/input-image";
import imageValidationSchema from "components/form/input-image/input-image.validation";
import GVButton from "components/gv-button";
import LogoField from "components/logo-field/logo-field";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object } from "yup";

enum FIELDS {
  logo = "logo"
}

const _ProfileImage: React.FC<Props> = ({ onSubmit, avatar, errorMessage }) => {
  const [t] = useTranslation();
  const form = useForm<FormValues>({
    defaultValues: {
      [FIELDS.logo]: {
        src: avatar
      }
    },
    validationSchema: object().shape({
      [FIELDS.logo]: imageValidationSchema(t)
    }),
    mode: "onBlur"
  });
  const {
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;

  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <div className="profile-image">
        <LogoField name={FIELDS.logo} defaultImage={UserIcon} />
        <GVButton
          type="submit"
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
        >
          {t("profile-page.settings.save-photo")}
        </GVButton>
      </div>
    </HookForm>
  );
};
const ProfileImage = React.memo(_ProfileImage);
export default ProfileImage;

interface Props {
  errorMessage?: string;
  avatar: string;
  onSubmit: (image: IImageValue) => void;
}

interface FormValues {
  logo: IImageValue;
}
