import GuidesSection from "components/guides/guides-section/guides-section";
import {
  getAllGuides,
  getCurrentGuide,
  getPrevNextGuidesNames,
  IPrevNextGuidesNamesProps
} from "components/guides/guides.helpers";
import { Guide, GuidesCategory } from "gv-api-web";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React, { useEffect, useState } from "react";

const initialPrevNextGuidesNames = {
  prev: "",
  next: ""
};

interface Props {
  navGuides: GuidesCategory[];
  onClickPass: (id: string) => void;
}

const _GuidesContainer: React.FC<Props> = ({ navGuides, onClickPass }) => {
  const { tab } = useHashTab("");
  const [allGuides, setAllGuides] = useState<Guide[] | undefined>();
  const [currentGuide, setCurrentGuide] = useState<Guide | undefined>();
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
      onClickPass={onClickPass}
    />
  );
};

const GuidesContainer = React.memo(_GuidesContainer);
export default GuidesContainer;
