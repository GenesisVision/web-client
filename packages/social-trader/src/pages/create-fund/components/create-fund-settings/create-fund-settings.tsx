import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import DepositDetailsBlock from "components/assets/fields/deposit-details-block";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import { IImageValue } from "components/form/input-image/input-image";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { FundCreateAssetPlatformInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { entryFeeRules, exitFeeRules } from "utils/validators/validators";

import { FUND_CURRENCY } from "../../create-fund.constants";
import { AssetsField } from "./assets-field";

export enum CREATE_FUND_FIELDS {
  available = "available",
  rate = "rate",
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  entryFee = "entryFee",
  logo = "logo",
  description = "description",
  title = "title",
  assets = "assets",
  exitFee = "exitFee"
}

interface Props {
  selfManaged?: boolean;
  errorMessage?: string;
  wallets: WalletData[];
  data: FundCreateAssetPlatformInfo;
  onSubmit: (values: ICreateFundSettingsFormValues) => void;
}

const _CreateFundSettings: React.FC<Props> = ({
  selfManaged,
  wallets,
  data,
  onSubmit,
  errorMessage
}) => {
  const { maxExitFee, maxEntryFee, minDeposit } = data;

  const [t] = useTranslation();

  const form = useForm<ICreateFundSettingsFormValues>({
    defaultValues: {
      [CREATE_FUND_FIELDS.entryFee]: selfManaged ? 0 : undefined,
      [CREATE_FUND_FIELDS.exitFee]: selfManaged ? 0 : undefined,
      [CREATE_FUND_FIELDS.depositWalletId]: safeGetElemFromArray(
        wallets,
        ({ currency }) => currency === "GVT"
      ).id
    },
    mode: "onChange"
  });
  const { watch, setValue } = form;
  const { depositAmount, description } = watch();

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <SettingsBlock
        label={t("create-fund-page:settings.main-settings")}
        blockNumber={"01"}
      >
        <DescriptionBlock
          showDescription={!selfManaged}
          asset={ASSET.FUND}
          titleName={CREATE_FUND_FIELDS.title}
          descriptionName={CREATE_FUND_FIELDS.description}
          logoName={CREATE_FUND_FIELDS.logo}
          description={description}
        />
      </SettingsBlock>
      <SettingsBlock
        label={t("create-fund-page:settings.asset-selection")}
        blockNumber={"02"}
      >
        <AssetsField name={CREATE_FUND_FIELDS.assets} />
      </SettingsBlock>
      <SettingsBlock
        hide={selfManaged}
        label={t("create-fund-page:settings.fees-settings")}
        blockNumber={"03"}
      >
        <FeesSettings
          firstFeeLabel={t("asset-settings:fields.entry-fee")}
          firstFeeUnderText={t("create-fund-page:settings.hints.entry-fee")}
          firstFeeName={CREATE_FUND_FIELDS.entryFee}
          firstFeeDescription={t(
            "create-fund-page:settings.hints.entry-fee-description",
            { maxFee: maxEntryFee }
          )}
          firstFeeRules={entryFeeRules(t, maxEntryFee)}
          secondFeeName={CREATE_FUND_FIELDS.exitFee}
          secondFeeLabel={t("create-fund-page:settings.fields.exit-fee")}
          secondFeeUnderText={t("create-fund-page:settings.hints.exit-fee")}
          secondFeeDescription={t(
            "create-fund-page:settings.hints.exit-fee-description",
            {
              maxFee: maxExitFee
            }
          )}
          secondFeeRules={exitFeeRules(t, maxExitFee)}
        />
      </SettingsBlock>
      <DepositDetailsBlock
        blockNumber={selfManaged ? 3 : 4}
        walletFieldName={CREATE_FUND_FIELDS.depositWalletId}
        inputName={CREATE_FUND_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minDeposit}
        setFieldValue={setValue}
        assetCurrency={FUND_CURRENCY}
      />
      <Row size={"large"}>
        <CreateAssetNavigation
          asset={ASSET.FUND}
          isSuccessful={!errorMessage}
        />
      </Row>
    </HookForm>
  );
};

export interface ICreateFundSettingsFormValues {
  [CREATE_FUND_FIELDS.available]: number;
  [CREATE_FUND_FIELDS.rate]: number;
  [CREATE_FUND_FIELDS.depositWalletId]: string;
  [CREATE_FUND_FIELDS.depositAmount]?: number;
  [CREATE_FUND_FIELDS.entryFee]?: number;
  [CREATE_FUND_FIELDS.logo]: IImageValue;
  [CREATE_FUND_FIELDS.description]: string;
  [CREATE_FUND_FIELDS.title]: string;
  [CREATE_FUND_FIELDS.assets]: Array<any>;
  [CREATE_FUND_FIELDS.exitFee]?: number;
}

const CreateFundSettings = withBlurLoader(React.memo(_CreateFundSettings));
export default CreateFundSettings;
