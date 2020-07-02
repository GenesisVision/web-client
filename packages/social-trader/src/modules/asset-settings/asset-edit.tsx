import DescriptionField from "components/assets/fields/description-field";
import TitleField from "components/assets/fields/title-field";
import { IImageValue } from "components/form/input-image/input-image";
import inputImageShape from "components/form/input-image/input-image.validation";
import LogoField from "components/logo-field/logo-field";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import {
  assetDescriptionShape,
  assetTitleShape
} from "utils/validators/validators";
import { object } from "yup";

import styles from "./asset-settings.module.scss";

enum FIELDS {
  title = "title",
  logo = "logo",
  description = "description"
}

const _AssetEdit: React.FC<Props> = ({
  editError,
  onSubmit,
  title,
  description: descriptionProp,
  logo
}) => {
  const [t] = useTranslation();

  const form = useForm<AssetEditFormValues>({
    defaultValues: {
      [FIELDS.title]: title,
      [FIELDS.description]: descriptionProp,
      [FIELDS.logo]: {
        src: logo.src
      }
    },
    validationSchema: object().shape({
      [FIELDS.title]: assetTitleShape(t),
      [FIELDS.description]: assetDescriptionShape(t),
      [FIELDS.logo]: inputImageShape(t)
    }),
    mode: "onBlur"
  });
  const { watch } = form;
  const { description } = watch();

  return (
    <SettingsBlock>
      <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
        <Row onlyOffset className={styles["asset-settings__block-wrapper"]}>
          <h3>{t("asset-settings:avatar.title")}</h3>
          <Row onlyOffset>
            <LogoField name={FIELDS.logo} />
          </Row>
        </Row>
        <Row
          size={"large"}
          onlyOffset
          className={styles["asset-settings__block-wrapper"]}
        >
          <h3>{t("asset-settings:name.title")}</h3>
          <Row onlyOffset>
            <TitleField name={FIELDS.title} />
          </Row>
        </Row>
        <Row
          size={"large"}
          onlyOffset
          className={styles["asset-settings__block-wrapper"]}
        >
          <h3>{t("asset-settings:strategy.title")}</h3>
          <Row onlyOffset>
            <DescriptionField
              name={FIELDS.description}
              description={description}
            />
          </Row>
        </Row>
        <Row size={"large"} onlyOffset>
          <SubmitButton isSuccessful={!editError}>
            {t("asset-settings:buttons.save")}
          </SubmitButton>
        </Row>
      </HookForm>
    </SettingsBlock>
  );
};

export interface AssetEditFormValues {
  [FIELDS.title]: string;
  [FIELDS.description]: string;
  [FIELDS.logo]: IImageValue;
}

interface Props {
  editError?: boolean;
  logo: IImageValue;
  title: string;
  description: string;
  onSubmit: (values: AssetEditFormValues) => void;
}

const AssetEdit = React.memo(_AssetEdit);
export default AssetEdit;
