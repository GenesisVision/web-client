import { ProgramDetails, ProgramDetailsFull, ProgramsList } from "gv-api-web";
import React, { ReactElement, useReducer, useState } from "react";

const ProgramTableWrapper: React.FC<ProgramTableWrapper> = ({
  programs,
  children
}) => {
  const [data, setData] = useState<Programs>(
    programs.programs.reduce<Programs>((acc, value) => {
      acc[value.id] = value;
      return acc;
    }, {})
  );

  const toggleFavourite: ToggleFavourite = (id, isFavorite) => {
    const program = data[id];
    if (program) {
      setData({
        ...data,
        [id]: {
          ...program,
          personalDetails: {
            ...program.personalDetails,
            isFavorite
          }
        }
      });
    }
  };

  return children({
    programs: data,
    toggleFavourite,
    total: programs.total
  });
};

export default ProgramTableWrapper;

interface Programs {
  [id: string]: ProgramDetails;
}

interface ProgramTableWrapper {
  programs: ProgramsList;
  children: (props: InjectedChildrenProps) => React.ReactElement;
}

interface InjectedChildrenProps {
  programs: Programs;
  total: number;
  toggleFavourite: ToggleFavourite;
}

type ToggleFavourite = (id: string, isFavorite: boolean) => void;
