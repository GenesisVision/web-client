import { PlatformNews } from "gv-api-web";
import FirstSliderWithAnimation from "pages/landing-page/components/first-slider/first-slider-with-animation";
import NewsList from "pages/landing-page/components/news/news-list";
import { slides } from "pages/landing-page/static-data/slides";
import React from "react";

interface Props {
  news: Array<PlatformNews>;
}

const _FirstScreen: React.FC<Props> = ({ news }) => {
  return (
    <>
      <FirstSliderWithAnimation slidesItems={slides} />
      <NewsList newsItems={news} />
    </>
  );
};

const FirstScreen = React.memo(_FirstScreen);
export default FirstScreen;
