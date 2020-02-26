import "pages/landing-page/styles/home.scss";

import { PlatformNews } from "gv-api-web";
import { useNetworkStatus } from "hooks/network-status";
import dynamic from "next/dynamic";
import FirstSlider from "pages/landing-page/components/first-slider/first-slider";
import NewsList from "pages/landing-page/components/news/news-list";
import { slides } from "pages/landing-page/static-data/slides";
import React, { useCallback } from "react";

const FirstSliderWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/first-slider/first-slider-with-animation"
  )
);

interface Props {
  news: Array<PlatformNews>;
}

const _FirstScreen: React.FC<Props> = ({ news }) => {
  const { effectiveConnectionType = "4g" } = useNetworkStatus();
  const renderSlider = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return (
          <FirstSliderWithAnimation
            className="home__grid-row"
            slidesItems={slides}
          />
        );
      default:
        return <FirstSlider className="home__grid-row" slidesItems={slides} />;
    }
  }, [effectiveConnectionType, slides]);
  return (
    <section className="home__section home__section--first-screen">
      <div className="home__container">
        {renderSlider()}
        <div className="home__grid-row home__grid-row--mob-wider">
          <NewsList className="home__grid-item" newsItems={news} />
        </div>
      </div>
    </section>
  );
};

const FirstScreen = React.memo(_FirstScreen);
export default FirstScreen;
