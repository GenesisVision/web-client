import Link, { ToType } from "components/link/link";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";

const _DetailsSubtitle: React.FC<{
  to?: ToType;
  text: string;
}> = ({ to, text }) => {
  return (
    <MutedText bold>
      <Link to={to}>{text}</Link>
    </MutedText>
  );
};

export const DetailsSubtitle = React.memo(_DetailsSubtitle);
