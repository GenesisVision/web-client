import GuidesSection from "components/guides/guides-section/guides-section";
import {
  getAllGuides,
  getCurrentGuide,
  getPrevNextGuidesNames,
  IPrevNextGuidesNamesProps
} from "components/guides/guides.helpers";
import { passGuide } from "components/guides/services/guides.services";
import { Guide, GuidesCategory } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  navGuides: GuidesCategory[];
}

const initialPrevNextGuidesNames = {
  prev: "",
  next: ""
};

const _GuidesContainer: React.FC<Props> = ({ navGuides }) => {
  const { tab } = useHashTab("");
  const allGuides = getAllGuides(navGuides);
  const [currentGuide, setCurrentGuide] = useState<Guide | undefined>();
  const [prevNextGuidesNames, setPrevNextGuidesNames] = useState<
    IPrevNextGuidesNamesProps
  >(initialPrevNextGuidesNames);
  const { sendRequest } = useApiRequest({
    request: passGuide
  });

  useEffect(() => {
    setCurrentGuide(getCurrentGuide(allGuides, tab));
  }, [allGuides, tab]);

  useEffect(() => {
    if (currentGuide) {
      setPrevNextGuidesNames(getPrevNextGuidesNames(allGuides, currentGuide));
    }
  }, [currentGuide]);

  const handlePass = useCallback(id => {
    sendRequest(id);
  }, []);

  return (
    <GuidesSection
      navGuides={navGuides}
      prevNextGuidesNames={prevNextGuidesNames}
      currentGuide={currentGuide}
      onClickPass={handlePass}
    />
  );
};

const GuidesContainer = React.memo(_GuidesContainer);
export default GuidesContainer;
