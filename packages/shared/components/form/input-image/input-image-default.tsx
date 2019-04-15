import * as React from "react";

const InputImageDefault: React.FC<Props> = ({ defaultImage }) => {
  return (
    <img src={defaultImage} />
    // <span
    //   className="input-image__preview-img"
    //   style={{
    //     backgroundImage: `url(${defaultImage})`
    //   }}
    // />
  );
};

export default React.memo(InputImageDefault);

interface Props {
  defaultImage: string;
}
