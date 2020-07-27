import GuidesSection from "components/guides/guides-section/guides-section";
import {
  getAllGuides,
  getCurrentGuide,
  getPrevNextGuidesNames,
  IPrevNextGuidesNamesProps
} from "components/guides/guides.helpers";
import {
  fetchGuides,
  passGuide
} from "components/guides/services/guides.services";
import { Guide, GuidesCategory } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useHashTab from "pages/wallet/services/hashTab.hook";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const initialPrevNextGuidesNames = {
  prev: "",
  next: ""
};

interface Props {
  navGuides: GuidesCategory[];
}

const _GuidesContainer: React.FC<Props> = ({ navGuides }) => {
  const dispatch = useDispatch();
  const updateGuides = () => dispatch(fetchGuides());
  const { errorMessage, sendRequest } = useApiRequest({
    request: passGuide,
    middleware: [updateGuides]
  });
  const { tab } = useHashTab("");
  const [allGuides] = useState<Guide[]>(getAllGuides(navGuides));
  const [currentGuide, setCurrentGuide] = useState<Guide | undefined>();
  const [prevNextGuidesNames, setPrevNextGuidesNames] = useState<
    IPrevNextGuidesNamesProps
  >(initialPrevNextGuidesNames);

  const handlePass = useCallback(id => {
    sendRequest(id);
  }, []);

  useEffect(() => {
    setCurrentGuide(getCurrentGuide(allGuides, tab));
  }, [allGuides, tab]);

  useEffect(() => {
    if (currentGuide)
      setPrevNextGuidesNames(getPrevNextGuidesNames(allGuides, currentGuide));
  }, [currentGuide, tab]);

  return (
    <GuidesSection
      navGuides={navGuides}
      prevNextGuidesNames={prevNextGuidesNames}
      currentGuide={currentGuide}
      onClickPass={handlePass}
      errorMessage={errorMessage}
    />
  );
};

const GuidesContainer = React.memo(_GuidesContainer);
export default GuidesContainer;
