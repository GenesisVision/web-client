import { PlatformNews } from "gv-api-web";
import { useNetworkStatusInWindow } from "hooks/network-status";
import dynamic from "next/dynamic";
import FirstSlider from "pages/landing-page/components/first-slider/first-slider";
import styles from "pages/landing-page/components/first-slider/first-slider.module.scss";
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
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const renderSlider = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return <FirstSliderWithAnimation slidesItems={slides} />;
      case "3g":
      case "2g":
        return <FirstSlider slidesItems={slides} />;
      default:
        return null;
    }
  }, [effectiveConnectionType, slides]);
  return (
    <>
      <div className={styles["slider__container"]}>{renderSlider()}</div>
      <NewsList newsItems={news} />
    </>
  );
};

const FirstScreen = React.memo(_FirstScreen);
export default FirstScreen;
