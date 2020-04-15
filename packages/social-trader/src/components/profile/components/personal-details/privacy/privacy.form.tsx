import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

type PrivacyValueType = "all" | "me";

const SELECT_VALUES = [
  {
    value: "all",
    label: "All users"
  },
  {
    value: "me",
    label: "Only me"
  }
];

enum FIELDS {
  view = "view",
  post = "post"
}

const PrivacySelect: React.FC<{
  name: string;
  title: string;
  label?: string;
}> = ({ label, name, title }) => {
  return (
    <div>
      <h5>{title}</h5>
      <GVHookFormField
        wide
        disableIfSingle
        name={name}
        component={SimpleTextField}
        label={label}
        InputComponent={Select}
      >
        {SELECT_VALUES.map(value => (
          <option value={value.value} key={value.value}>
            {value.label}
          </option>
        ))}
      </GVHookFormField>
    </div>
  );
};

const _PublicInfoForm: React.FC<Props> = ({
  onSubmit,
  isPending,
  errorMessage
}) => {
  const [t] = useTranslation();
  const form = useForm<IPrivacyFormValues>({
    defaultValues: {
      [FIELDS.view]: "all",
      [FIELDS.post]: "me"
    },
    mode: "onBlur"
  });

  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <Row>
        <PrivacySelect
          title={t("profile-page.privacy.view")}
          name={FIELDS.view}
        />
      </Row>
      <Row large>
        <PrivacySelect
          title={t("profile-page.privacy.post")}
          name={FIELDS.post}
        />
      </Row>
      <Row>
        <FormError error={errorMessage} />
      </Row>
      <Row>
        <SubmitButton isPending={isPending} isSuccessful={!errorMessage}>
          {t("buttons.save")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

export interface IPrivacyFormValues {
  [FIELDS.view]: PrivacyValueType;
  [FIELDS.post]: PrivacyValueType;
}

interface Props {
  isPending: boolean;
  onSubmit: (values: IPrivacyFormValues) => void;
  data: any;
  errorMessage?: string;
}

const PrivacyForm = React.memo(_PublicInfoForm);
export default PrivacyForm;
