import "./dashboard-in-requests.scss";

import { ProgramRequestsOld } from "gv-api-web";
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
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import RequestLine from "shared/components/request-line/request-line";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import useAnchor from "shared/hooks/anchor.hook";
import useRole from "shared/hooks/use-role.hook";
import { formatCurrencyValue } from "shared/utils/formatter";
import { AuthRootState } from "shared/utils/types";

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
          {inRequests.requests.map(x => (
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
  data: ProgramRequestsOld;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelRequest: CancelRequestType;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardInRequestsContainer = compose<
  React.ComponentType<OwnProps & WithBlurLoaderProps<ProgramRequestsOld>>
>(
  withBlurLoader,
  connect<null, DispatchProps, OwnProps, AuthRootState>(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DashboardInRequestsContainer);
export default DashboardInRequestsContainer;
