import AboutField from "components/assets/fields/about-field";
import UserNameField from "components/assets/fields/user-name-field";
import FormError from "components/form/form-error/form-error";
import { SubmitButton } from "components/submit-button/submit-button";
import { UpdateProfileViewModel } from "gv-api-web";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import styles from "./public-info.module.scss";

enum FIELDS {
  userName = "userName",
  about = "about"
}

const _PublicInfoForm: React.FC<Props> = ({
  onSubmit,
  userName = "",
  about: aboutProp = "",
  isPending,
  errorMessage
}) => {
  const [t] = useTranslation();
  const form = useForm<IAboutFormValues>({
    defaultValues: {
      [FIELDS.userName]: userName,
      [FIELDS.about]: aboutProp
    },
    mode: "onBlur"
  });
  const { watch } = form;

  const { about } = watch();

  return (
    <HookForm
      resetOnSuccess
      form={form}
      className={styles["about"]}
      onSubmit={onSubmit}
    >
      <UserNameField name={FIELDS.userName} />
      <AboutField description={about} name={FIELDS.about} />
      <FormError error={errorMessage} />
      <SubmitButton isPending={isPending} isSuccessful={!errorMessage}>
        {t("buttons.save")}
      </SubmitButton>
    </HookForm>
  );
};

export interface IAboutFormValues extends UpdateProfileViewModel {}

interface Props {
  isPending: boolean;
  onSubmit: (values: IAboutFormValues) => void;
  userName: string;
  about: string;
  errorMessage?: string;
}
const PublicInfoForm = React.memo(_PublicInfoForm);
export default PublicInfoForm;
