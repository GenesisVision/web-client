import "./broker-info.scss";

import classNames from "classnames";
import { useToLink } from "components/link/link.helper";
import { useTranslation } from "i18n";
import { composeAttachAccountRouteWithBroker } from "pages/attach-account/attach-account.constants";
import { composeCreateAccountRouteWithBroker } from "pages/create-account/create-account.constants";
import { JoinButton } from "pages/landing-page/components/join-button";
import { TBrokerInfo } from "pages/landing-page/static-data/brokers";
import React from "react";

import BrokerAdvantage from "./broker-advantage";

interface Props extends TBrokerInfo {
  className?: string;
  darkTheme?: boolean;
}

const _BrokerInfo: React.FC<Props> = ({
  type,
  darkTheme,
  className,
  title,
  description,
  listItems
}) => {
  const { t } = useTranslation();
  const { linkCreator } = useToLink();
  const tradingLink =
    type === "Attach"
      ? composeAttachAccountRouteWithBroker(title)
      : composeCreateAccountRouteWithBroker(title);
  return (
    <div
      className={classNames("broker-info", className, {
        "broker-info--dark": darkTheme
      })}
    >
      <h3 className="broker-info__subtitle">{t(title)}</h3>
      {description && (
        <p className="broker-info__description">{t(description)}</p>
      )}
      <JoinButton eventLabel={"Start trading"} href={linkCreator(tradingLink)}>
        {t("landing-page.buttons.start-trading")}
      </JoinButton>
      <ul className="broker-info__list-advantages">
        {listItems.map((item, index) => (
          <BrokerAdvantage
            key={index}
            text={item.text}
            number={item.number}
            imageBg={item.imageBg}
          />
        ))}
      </ul>
    </div>
  );
};

const BrokerInfo = React.memo(_BrokerInfo);
export default BrokerInfo;
