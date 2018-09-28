import { GVProgramAvatar } from "gv-react-components";
import React from "react";

import withUrl from "../../shared/decorators/with-url";

const ProgramAvatar = props => {
  return <GVProgramAvatar {...props} />;
};

export default withUrl("url")(ProgramAvatar);
