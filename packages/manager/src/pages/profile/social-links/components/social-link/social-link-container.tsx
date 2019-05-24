import * as React from "react";

import SocialLinkEdit from "./social-link-edit";
import SocialLinkView from "./social-link-view";

enum CONTAINER_STATE {
  VIEW = "VIEW",
  EDIT = "EDIT"
}

const SocialLinkContainer: React.FC<OwnProps> = ({ name, url, value }) => {
  const [state, setState] = React.useState(CONTAINER_STATE.VIEW);
  return null;
  // <SocialLinkEdit
  //   name={name}
  //   url={url}
  //   value={value}
  //   onSubmit={() => {
  //     setState(CONTAINER_STATE.VIEW);
  //   }}
  // />
  // if (state === CONTAINER_STATE.VIEW) {
  //   return (
  //     <SocialLinkView
  //       name={name}
  //       url={url}
  //       value={value}
  //       onClick={() => {
  //         setState(CONTAINER_STATE.EDIT);
  //       }}
  //     />
  //   );
  // }

  // return (
  //   <SocialLinkEdit
  //     name={name}
  //     url={url}
  //     value={value}
  //     onClick={() => {
  //       setState(CONTAINER_STATE.VIEW);
  //     }}
  //   />
  // );
};

export default SocialLinkContainer;

interface OwnProps {
  name: string;
  url: string;
  value: string;
}
