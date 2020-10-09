import { useTranslation } from "i18n";
import {
  EventItemAdaptiveElem,
  EventItemAvatarContainer,
  EventItemButton,
  EventItemImage,
  EventItemInfo,
  EventItemLi,
  EventItemTitle
} from "pages/landing-page/components/events-list/events-list.styles";
import { JoinButton } from "pages/landing-page/components/join-button";
import LogoIcon from "pages/landing-page/images/logos/logo.svg";
import React from "react";
import { INVEST_ROUTE } from "routes/invest.routes";

interface Props {
  minHeight: number;
}

const _EventLastItem: React.FC<Props> = ({ minHeight }) => {
  const { t } = useTranslation();
  return (
    <EventItemLi last minHeight={minHeight}>
      <EventItemAvatarContainer last>
        <EventItemImage last src={LogoIcon} alt="Genesis Vision" />
      </EventItemAvatarContainer>
      <EventItemInfo>
        <EventItemTitle>Genesis Vision</EventItemTitle>
      </EventItemInfo>
      <EventItemButton>
        <JoinButton href={INVEST_ROUTE}>
          <>
            <EventItemAdaptiveElem mobile>
              {t("landing-page:buttons.join")}
            </EventItemAdaptiveElem>
            <EventItemAdaptiveElem desktop>
              {t("landing-page:buttons.discover")}
            </EventItemAdaptiveElem>
          </>
        </JoinButton>
      </EventItemButton>
    </EventItemLi>
  );
};

const EventLastItem = React.memo(_EventLastItem);
export default EventLastItem;
