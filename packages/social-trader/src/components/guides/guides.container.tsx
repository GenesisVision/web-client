import GuidesSection from "components/guides/guides-section/guides-section";
import {
  getAllGuides,
  getCurrentGuide,
  getPrevNextGuidesNames,
  IPrevNextGuidesNamesProps
} from "components/guides/guides.helpers";
import { navGuides, TGuide } from "pages/guides/guides.static-data";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React, { useEffect, useState } from "react";

const initialPrevNextGuidesNames = {
  prev: "",
  next: ""
};

const _GuidesContainer: React.FC = () => {
  const { tab } = useHashTab("");
  const [allGuides, setAllGuides] = useState<TGuide[] | undefined>();
  const [currentGuide, setCurrentGuide] = useState<TGuide | undefined>();
  const [prevNextGuidesNames, setPrevNextGuidesNames] = useState<
    IPrevNextGuidesNamesProps
  >(initialPrevNextGuidesNames);

  useEffect(() => {
    setAllGuides(getAllGuides(navGuides));
  }, [navGuides]);

  useEffect(() => {
    if (allGuides) setCurrentGuide(getCurrentGuide(allGuides, tab));
  }, [allGuides, tab]);

  useEffect(() => {
    if (currentGuide && allGuides)
      setPrevNextGuidesNames(getPrevNextGuidesNames(allGuides, currentGuide));
  }, [currentGuide, tab]);

  return (
    <GuidesSection
      navGuides={navGuides}
      prevNextGuidesNames={prevNextGuidesNames}
      currentGuide={currentGuide}
    />
  );
};

const GuidesContainer = React.memo(_GuidesContainer);
export default GuidesContainer;
