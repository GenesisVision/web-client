import { Center } from "components/center/center";
import { RowStyledCenter } from "components/row/row.style";
import React from "react";
import styled from "styled-components";

import { IRowProps } from "./row.types";

export const Row: React.FC<IRowProps> = props => {
  return <RowStyledCenter {...props} />;
};
