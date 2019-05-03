import { FormikProps, withFormik } from "formik";
import { FundAssetPartWithIcon } from "gv-api-web";
import { GVButton } from "gv-react-components";
import CreateFundSettingsAddAsset from "pages/create-fund/components/create-fund-settings/create-fund-settings-add-asset/create-fund-settings-add-asset";
import CreateFundSettingsAssetsComponent from "pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";
import * as React from "react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import ErrorMessage, {
  MESSAGE_TYPES
} from "shared/components/error-message/error-message";
import FormError from "shared/components/form/form-error/form-error";
import { TFundAssetRemoveHandle } from "shared/components/fund-asset/fund-asset-container";
import { anchorElType } from "shared/components/popover/popover";
import { SetSubmittingType } from "shared/utils/types";
import { array, number, object } from "yup";

class _ReallocateForm extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined,
    assets: this.props.assets,
    remainder: 0
  };
  componentDidMount() {
    this.setState({ remainder: this.getRemainder() });
  }
  handlePercentChange = (
    asset: FundAssetPartWithIcon
  ): ChangeEventHandler<any> => e => {
    let value = +e.target.value;
    if (isNaN(value)) return;
    if (value > this.getRemainderWithoutChoised(asset))
      value = this.getRemainderWithoutChoised(asset);
    asset.percent = value;
    this.updateAssets();
  };
  handleDown = (asset: FundAssetPartWithIcon) => () => {
    if (asset.percent === 0) return;
    asset.percent--;
    this.updateAssets();
  };
  handleUp = (asset: FundAssetPartWithIcon) => () => {
    if (this.state.remainder - 1 < 0) return;
    asset.percent++;
    this.updateAssets();
  };
  getRemainder = () =>
    100 - this.state.assets.reduce((sum, item) => sum + item.percent, 0);
  getRemainderWithoutChoised = (asset: FundAssetPartWithIcon) => {
    return (
      100 -
      this.state.assets
        .filter(item => item.asset !== asset.asset)
        .reduce((sum, item) => sum + item.percent, 0)
    );
  };
  updateAssets = () => {
    const newRemainder = this.getRemainder();
    this.setState({
      assets: [...this.state.assets],
      remainder: newRemainder
    });
    this.props.setFieldValue("remainder", newRemainder);
    this.props.setFieldValue(
      "assets",
      this.state.assets.filter(item => item.percent > 0)
    );
  };
  removeHandle: TFundAssetRemoveHandle = currency => () => {
    const asset = this.state.assets.find(item => item.asset === currency);
    asset!.percent = 0;
    this.updateAssets();
  };
  handleOpenDropdown: MouseEventHandler = event => {
    this.setState({ anchor: event.currentTarget });
  };
  handleCloseDropdown = () => this.setState({ anchor: undefined });
  render() {
    const { anchor, assets, remainder } = this.state;
    const {
      t,
      handleSubmit,
      isValid,
      dirty,
      errors,
      errorMessage,
      isSubmitting
    } = this.props;
    return (
      <form
        className="reallocate-container dialog__top"
        id="reallocate"
        onSubmit={handleSubmit}
      >
        <div className="dialog__header">
          <h2>{t("manager.reallocate.title")}</h2>
        </div>
        {(errors.assets && (
          <ErrorMessage error={errors.assets} type={MESSAGE_TYPES.OVER} />
        )) ||
          (errors.remainder && (
            <ErrorMessage error={errors.remainder} type={MESSAGE_TYPES.OVER} />
          ))}
        <CreateFundSettingsAssetsComponent
          assets={assets.filter(item => item.percent > 0) || []}
          remainder={remainder}
          removeHandle={this.removeHandle}
          addHandle={this.handleOpenDropdown}
        />
        <CreateFundSettingsAddAsset
          anchor={anchor}
          handleCloseDropdown={this.handleCloseDropdown}
          assets={assets}
          handleDown={this.handleDown}
          handleUp={this.handleUp}
          handlePercentChange={this.handlePercentChange}
        />
        <div className="reallocate-container__form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="dialog__buttons">
          <GVButton
            type={"submit"}
            disabled={!isValid || !dirty || isSubmitting}
          >
            {t("manager.reallocate.apply")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export interface IReallocateFormValues {
  assets: FundAssetPartWithIcon[];
  remainder: number;
}

export interface IReallocateFormOwnProps {
  assets: FundAssetPartWithIcon[];
  onSubmit(
    values: IReallocateFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}

interface Props
  extends FormikProps<IReallocateFormValues>,
    IReallocateFormOwnProps,
    InjectedTranslateProps {}

interface State {
  assets: FundAssetPartWithIcon[];
  remainder: number;
  anchor?: anchorElType;
}

const ReallocateForm = compose<
  React.FunctionComponent<IReallocateFormOwnProps>
>(
  translate(),
  withFormik<IReallocateFormOwnProps, IReallocateFormValues>({
    displayName: "reallocate",
    enableReinitialize: true,
    validationSchema: (props: Props) =>
      object().shape({
        remainder: number()
          .required(
            props.t("manager.create-fund-page.settings.validation.assets-share")
          )
          .max(
            0,
            props.t("manager.create-fund-page.settings.validation.assets-share")
          ),
        assets: array()
          .required(
            props.t("manager.create-fund-page.settings.validation.assets-count")
          )
          .min(
            2,
            props.t("manager.create-fund-page.settings.validation.assets-count")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_ReallocateForm);
export default ReallocateForm;
