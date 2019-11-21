import "./dashboard-in-requests.scss";

import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import RequestLine from "components/request-line/request-line";
import StatisticItem from "components/statistic-item/statistic-item";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import useAnchor from "hooks/anchor.hook";
import useRole from "hooks/use-role.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { formatCurrencyValue } from "utils/formatter";
import { AuthRootState } from "utils/types";

import { CancelRequestType } from "../../dashboard.constants";

const _DashboardInRequestsContainer: React.FC<Props> = ({
  data: inRequests,
  service
}) => {
  const [t] = useTranslation();
  const role = useRole();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div className="dashboard-request">
      <StatisticItem
        label={t(
          `${role ? `${role}.` : ""}dashboard-page.chart-section.in-requests`
        )}
        big
      >
        <NumberFormat
          value={formatCurrencyValue(inRequests.totalValue, "GVT")}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
        <ActionsCircleIcon
          condition={inRequests.requests.length !== 0}
          className="dashboard-request__icon"
          primary={!!anchor}
          onClick={setAnchor}
        />
      </StatisticItem>
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <div className="dashboard-request-popover">
          {inRequests.requests.map((x: any) => (
            <RequestLine
              key={x.id}
              request={x}
              cancelRequest={service.cancelRequest}
              onApplyCancelRequest={clearAnchor}
            />
          ))}
        </div>
      </Popover>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { cancelRequest }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { cancelRequest },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps {}

interface OwnProps {
  cancelRequest: CancelRequestType;
  data: any;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelRequest: CancelRequestType;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardInRequestsContainer = compose<
  React.ComponentType<OwnProps & WithBlurLoaderProps<any>>
>(
  withBlurLoader,
  connect<null, DispatchProps, OwnProps, AuthRootState>(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DashboardInRequestsContainer);
export default DashboardInRequestsContainer;
