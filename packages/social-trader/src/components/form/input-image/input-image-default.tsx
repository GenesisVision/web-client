import ImageBase from "components/avatar/image-base";
import * as React from "react";

const InputImageDefault: React.FC<Props> = ({ src = "", defaultImage }) => {
  return (
    <ImageBase
      alt="Default Profile Avatar"
      defaultImage={defaultImage}
      src={src}
    />
  );
};

export default React.memo(InputImageDefault);

interface Props {
  src?: string;
  defaultImage: string;
}
