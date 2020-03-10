import "./guides-container.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import DetailsBlock from "components/details/details-block";
import GuidesList from "components/guides/guides-list";
import GVButton from "components/gv-button";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  navGuides: any;
}

const _GuidesContainer: React.FC<Props> = ({ navGuides }) => {
  const initialTab =
    navGuides.trade && navGuides.trade.lessons.length
      ? `#${navGuides.trade.lessons[0].id}`
      : "#";
  const { tab } = useHashTab(initialTab);
  const [idItemActive, setIdItemActive] = useState("");
  return (
    <section className="guides-container">
      <h1 className="guides-container__title">
        Genesis Vision Step By Step Guides
      </h1>
      <nav className="guides-container__nav">
        <DetailsBlock
          className="guides-container__nav-item"
          horizontalPaddings
          tablet
        >
          <GuidesList {...navGuides.trade} tab={tab} isVisible />
        </DetailsBlock>
        <DetailsBlock
          className="guides-container__nav-item"
          horizontalPaddings
          tablet
        >
          <GuidesList {...navGuides.invest} tab={tab} />
        </DetailsBlock>
        <DetailsBlock
          className="guides-container__nav-item"
          horizontalPaddings
          tablet
        >
          <GuidesList {...navGuides.manage} tab={tab} />
        </DetailsBlock>
      </nav>
      <DetailsBlock className="guides-container__content">
        <h3>Intro</h3>
        <iframe
          width="100%"
          height="340px"
          src="https://www.youtube.com/embed/MSSWM6BwigY"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
        <p>
          Diversify your capital across hundreds of cryptocurrencies in one
          click. Select a fund with a composition that matches your opinion on
          the market and let the manager readjust while the market evolves. You
          can withdraw your capital at any time you retain full control of your
          investment.
        </p>
        <p>
          Diversify your capital across hundreds of cryptocurrencies in one
          click. Select a fund with a composition that matches your opinion on
          the market and let the manager readjust while the market evolves. You
          can withdraw your capital at any time you retain full control of your
          investment.
        </p>
        <p>
          Diversify your capital across hundreds of cryptocurrencies in one
          click. Select a fund with a composition that matches your opinion on
          the market and let the manager readjust while the market evolves. You
          can withdraw your capital at any time you retain full control of your
          investment.
        </p>
        <GVButton>I've done!</GVButton>
      </DetailsBlock>
    </section>
  );
};

const GuidesContainer = React.memo(_GuidesContainer);
export default GuidesContainer;
