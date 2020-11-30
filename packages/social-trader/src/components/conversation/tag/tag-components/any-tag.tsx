import { IAnyTagProps } from "components/conversation/tag/tag-components/tag-components.types";
import React from "react";

export const AnyTag: React.FC<IAnyTagProps> = ({ name }) => {
  return <>{name}</>;
};
