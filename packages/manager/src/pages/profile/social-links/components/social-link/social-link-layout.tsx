import "./social-link.scss";

import * as React from "react";

import { SocialLink } from "../../services/social-links.service";
import SocialLinkEdit from "./social-link-edit";

//import SocialLinkContainer from "./social-link-container";

const SocialLinkLayout: React.FC<OwnProps> = ({ socialLink }) => {
  return (
    <div className="social-link">
      <img
        src={socialLink.logo}
        alt={socialLink.name}
        className="social-logo"
      />
      <SocialLinkEdit
        id={socialLink.id}
        name={socialLink.name}
        url={socialLink.url}
        value={socialLink.value}
        onSubmit={(id, value) => {
          //setState(CONTAINER_STATE.VIEW);
        }}
      />
    </div>
  );
};

export default SocialLinkLayout;

interface OwnProps {
  socialLink: SocialLink;
}
