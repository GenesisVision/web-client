import { Guide, GuidesCategory } from "gv-api-web";
import { safeGetElemFromArray } from "utils/helpers";

export const getAllGuides = (navGuides: GuidesCategory[]): Guide[] => {
  return navGuides.reduce((acc: Guide[], current) => {
    return [...acc, ...current.guides];
  }, []);
};

export const getCurrentGuide = (allGuides: Guide[], tab: string): Guide => {
  return safeGetElemFromArray(
    allGuides,
    guide => guide.canonicalName === tab.slice(1, tab.length)
  );
};

export interface IPrevNextGuidesNamesProps {
  prev: string;
  next: string;
}

export const getPrevNextGuidesNames = (
  allGuides: Guide[],
  currentGuide: Guide
): IPrevNextGuidesNamesProps => {
  const currentIndex = allGuides.indexOf(currentGuide);
  const nextIndex = currentIndex + 1;
  const prevIndex = currentIndex - 1;
  return {
    next:
      nextIndex !== allGuides.length ? allGuides[nextIndex].canonicalName : "",
    prev: prevIndex > -1 ? allGuides[prevIndex].canonicalName : ""
  };
};
