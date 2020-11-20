import { IPrevNextGuide } from "components/guides/guide-block/guide-block";
import { IGuide, TNavGuide } from "pages/guides/guides.static-data";
import { safeGetElemFromArray } from "utils/helpers";

export const getAllGuides = (navGuides: TNavGuide[]): IGuide[] => {
  return navGuides.reduce((acc: IGuide[], current) => {
    return [...acc, ...current.guides];
  }, []);
};

export const getCurrentGuide = (allGuides: IGuide[], tab?: string): IGuide => {
  return tab
    ? safeGetElemFromArray(
        allGuides,
        guide => guide.canonicalName === tab.slice(1, tab.length)
      )
    : allGuides[0];
};

interface IPrevNextGuidesProps {
  prevGuide: IPrevNextGuide | null;
  nextGuide: IPrevNextGuide | null;
}

export const getPrevNextGuides = (
  allGuides: IGuide[],
  currentGuide: IGuide
): IPrevNextGuidesProps => {
  const currentIndex = allGuides.indexOf(currentGuide);
  const nextIndex = currentIndex + 1;
  const prevIndex = currentIndex - 1;
  const nextGuide =
    nextIndex !== allGuides.length
      ? {
          link: allGuides[nextIndex].canonicalName,
          name: allGuides[nextIndex].name
        }
      : null;
  const prevGuide =
    prevIndex > -1
      ? {
          link: allGuides[prevIndex].canonicalName,
          name: allGuides[prevIndex].name
        }
      : null;
  return {
    prevGuide,
    nextGuide
  };
};
