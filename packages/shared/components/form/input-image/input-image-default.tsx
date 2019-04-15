import * as React from "react";
import ImageBase from "shared/components/avatar/image-base";

const InputImageDefault: React.FC<Props> = ({ defaultImage }) => {
  return (
    <ImageBase
      alt="Default Profile Avatar"
      defaultImage={defaultImage}
      url=""
    />
    //<img src={defaultImage} />
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
