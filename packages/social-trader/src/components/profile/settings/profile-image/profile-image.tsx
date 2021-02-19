import { IImageValue } from "components/form/input-image/input-image";
import LogoField from "components/logo-field/logo-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  logo = "logo"
}

interface Props {
  errorMessage?: string;
  avatar: string;
  onSubmit: (image: IProfileImageFormValues) => void;
}

export interface IProfileImageFormValues {
  logo: IImageValue;
}

const _ProfileImage: React.FC<Props> = ({ onSubmit, avatar, errorMessage }) => {
  const [t] = useTranslation();
  const form = useForm<IProfileImageFormValues>({
    defaultValues: {
      [FIELDS.logo]: {
        src: avatar
      }
    },
    mode: "onBlur"
  });

  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <div>
        <Row onlyOffset>
          <LogoField name={FIELDS.logo} defaultImage={UserIcon} />
        </Row>
        <Row size={"xlarge"}>
          <SubmitButton isSuccessful={!errorMessage}>
            {t("profile-page:settings.save-photo")}
          </SubmitButton>
        </Row>
      </div>
    </HookForm>
  );
};
const ProfileImage = React.memo(_ProfileImage);
export default ProfileImage;
