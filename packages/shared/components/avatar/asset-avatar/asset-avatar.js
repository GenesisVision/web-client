import { GVProgramAvatar } from "gv-react-components";
import React from "react";
import withUrl from "shared/decorators/with-url";

let AssetAvatar = props => {
  return <GVProgramAvatar {...props} />;
};

AssetAvatar = withUrl("url")(AssetAvatar);
export default AssetAvatar;
