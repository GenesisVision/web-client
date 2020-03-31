import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";

export const DialogInfo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <div className="dialog__info">
    <MutedText small noWrap={false}>
      {children}{" "}
    </MutedText>
  </div>
);
