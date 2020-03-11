import * as React from "react";

const _TagCircle: React.FC<Props> = ({ backgroundColor }) => (
  <div className="tag-circle" style={{ backgroundColor }} />
);

interface Props {
  backgroundColor: string;
}

const TagCircle = React.memo(_TagCircle);
export default TagCircle;
