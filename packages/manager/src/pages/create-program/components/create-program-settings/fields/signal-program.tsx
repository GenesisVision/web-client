import CreateAssetField from "components/create-asset/create-asset-field/create-asset-field";
import React from "react";
import { useTranslation } from "react-i18next";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import withLoader from "shared/decorators/with-loader";

const _SignalProgram: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <CreateAssetField wide>
      <GVFormikField
        type="checkbox"
        color="primary"
        name={name}
        label={
          <span>
            {t("manager.create-program-page.settings.fields.provide-signals")}
          </span>
        }
        component={GVCheckbox}
      />
    </CreateAssetField>
  );
};

interface Props {
  name: string;
}

const SignalProgram = withLoader(React.memo(_SignalProgram));
export default SignalProgram;
