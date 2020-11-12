import { TGuide, TNavGuide } from "pages/guides/guides.static-data";
import { safeGetElemFromArray } from "utils/helpers";

export const getAllGuides = (navGuides: TNavGuide[]): TGuide[] => {
  return navGuides.reduce((acc: TGuide[], current) => {
    return [...acc, ...current.guides];
  }, []);
};

export const getCurrentGuide = (allGuides: TGuide[], tab: string): TGuide => {
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
  allGuides: TGuide[],
  currentGuide: TGuide
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
