import classNames from "classnames";
import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBaseElement from "components/avatar/image-base.element";
import Link, { LinkProps } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import dayjs from "dayjs";
import { NotificationViewModel } from "gv-api-web";
import NewsIcon from "media/news.svg";
import RedUserIcon from "media/red-user.svg";
import * as React from "react";
import {
  FUND_DETAILS_FOLDER_ROUTE,
  PROGRAM_DETAILS_FOLDER_ROUTE
} from "routes/invest.routes";
import {
  composeFundsDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";

enum TYPE {
  PROFILE = "profile",
  PLATFORM = "platform"
}

const getStaticIconUrl = (type: string): string | null => {
  return type.indexOf(TYPE.PROFILE) !== -1
    ? RedUserIcon
    : type.indexOf(TYPE.PLATFORM) !== -1
    ? NewsIcon
    : null;
};

const _NotificationAssetAvatar: React.FC<INotificationProps> = ({
  type,
  url,
  logo,
  color,
  closeNotifications,
  assetType
}) => {
  const { linkCreator } = useToLink();
  const Tag: React.ComponentType<LinkProps | any> | string = url ? Link : "div";
  const to = url
    ? linkCreator(
        assetType === "Program"
          ? composeProgramDetailsUrl(url)
          : composeFundsDetailsUrl(url),
        assetType === "Program"
          ? PROGRAM_DETAILS_FOLDER_ROUTE
          : FUND_DETAILS_FOLDER_ROUTE
      )
    : null;
  return (
    <Tag to={to} onClick={closeNotifications} className="notification__icon">
      <AssetAvatar
        url={logo}
        alt={type}
        className="notification__icon-logo"
        color={color}
      />
    </Tag>
  );
};
const NotificationAssetAvatar = React.memo(_NotificationAssetAvatar);

interface INotificationOwnProps {
  closeNotifications(): void;
}

type INotificationProps = NotificationViewModel & INotificationOwnProps;

const _Notification: React.FC<INotificationProps> = props => {
  const { date, text, isUnread, type } = props;
  const staticIconUrl = getStaticIconUrl(type.toLowerCase());
  return (
    <Row
      center={false}
      className={classNames(
        "notification",
        `notification--type-${type.toLowerCase()}`,
        {
          "notification--is-unread": isUnread
        }
      )}
    >
      <RowItem>
        {staticIconUrl ? (
          <div className="notification__icon">
            <ImageBaseElement
              src={staticIconUrl}
              alt={type}
              className="notification__icon-logo"
            />
          </div>
        ) : (
          <NotificationAssetAvatar {...props} />
        )}
      </RowItem>

      <RowItem>
        <div className="notification__content">
          <div className="notification__description">{text}</div>
          <div className="notification__date">
            <MutedText>{dayjs(date).format("HH:mm")}</MutedText>
          </div>
        </div>
      </RowItem>
    </Row>
  );
};

const Notification = React.memo(_Notification);
export default Notification;
