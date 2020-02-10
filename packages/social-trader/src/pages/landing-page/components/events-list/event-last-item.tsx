import ImageBaseElement from "components/avatar/image-base.element";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import LogoIcon from "pages/landing-page/images/logos/logo.svg";
import React from "react";
import { INVEST_ROUTE } from "routes/invest.routes";

const EventLastItem: React.FC = () => (
  <li className="events-list__item events-list__item--last">
    <div className="events-list__item-avatar">
      <ImageBaseElement
        className="events-list__item-image"
        src={LogoIcon}
        alt="Genesis Vision"
      />
    </div>
    <div className="events-list__item-info">
      <div className="events-list__item-title">Genesis Vision</div>
    </div>
    <div className="events-list__item-button">
      <LPButton href={INVEST_ROUTE}>
        <>
          <span className="events-list__only-mob">Join</span>
          <span className="events-list__only-desktop">Discover</span>
        </>
      </LPButton>
    </div>
  </li>
);
export default EventLastItem;