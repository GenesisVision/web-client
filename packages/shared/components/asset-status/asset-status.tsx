import "./asset-status.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import { ROLE_ENV, STATUS } from "shared/constants/constants";

import AssetStatusRequests from "./asset-status-requests";

const getStatusClassName = (status: STATUS, className?: string) => {
  return classNames("asset-status", className, {
    "asset-status__active": status === STATUS.ACTIVE,
    "asset-status__investing": status === STATUS.INVESTING,
    "asset-status__withdrawing": status === STATUS.WITHDRAWING,
    "asset-status__ended": status === STATUS.ENDED,
    "asset-status__pending": status === STATUS.PENDING
  });
};

interface IAssetStatusOwnProps {
  className?: string;
  status: STATUS;
  id: string;
  asset: any;
  onCancel: any;
}

interface IAssetStatusProps extends IAssetStatusOwnProps {}

interface IAssetStatusState {
  anchor?: EventTarget;
}

class AssetStatus extends React.PureComponent<
  IAssetStatusProps & InjectedTranslateProps,
  IAssetStatusState
> {
  state = {
    anchor: undefined
  };

  handleOpenDropdown = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (
      this.props.status === STATUS.INVESTING ||
      this.props.status === STATUS.WITHDRAWING
    )
      this.setState({ anchor: event.currentTarget });
  };
  handleCloseDropdown = () => this.setState({ anchor: undefined });

  render() {
    const { t, className, status, id, asset, onCancel } = this.props;
    return (
      <React.Fragment>
        <span
          className={getStatusClassName(status, className)}
          onClick={this.handleOpenDropdown}
        >
          {t(`program-statuses.${status}`)}
        </span>
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <GVScroll autoHeight>
            <div className="dashboard-request-popover">
              <AssetStatusRequests
                id={id}
                role={ROLE_ENV}
                asset={asset}
                handleCloseDropdown={this.handleCloseDropdown}
                onCancel={onCancel}
              />
            </div>
          </GVScroll>
        </Popover>
      </React.Fragment>
    );
  }
}

export default translate()(AssetStatus);
