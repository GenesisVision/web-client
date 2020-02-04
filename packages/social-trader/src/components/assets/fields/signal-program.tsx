import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import GVFormikField from "components/gv-formik-field";
import withLoader from "decorators/with-loader";
import React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _SignalProgram: React.FC<Props> = ({ name }) => {
  const [t] = useTranslation();
  return (
    <AssetField wide>
      <GVFormikField
        wide
        type="checkbox"
        color="primary"
        name={name}
        label={
          <span>
            {t("create-program-page.settings.fields.provide-signals")}
          </span>
        }
        component={GVCheckbox}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
}

const SignalProgram = withLoader(React.memo(_SignalProgram));
export default SignalProgram;
