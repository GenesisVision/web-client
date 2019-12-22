import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import React from "react";

interface IProgramShortProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  data: string;
  url?: string;
  imageClassName?: string;
}

const _ProgramShort: React.FC<IProgramShortProps> = ({
  title,
  data,
  url,
  imageClassName
}) => (
  <li className="programs-list__item">
    <div className="program-short">
      <ImageBase
        DefaultImageComponent={GVProgramDefaultAvatar}
        imageClassName={classNames("programs-list__item-image", imageClassName)}
        url={url}
      />
    </div>
    <div className="programs-list__item-title">{title}</div>
    <div className="programs-list__item-data">
      <div className="programs-list__item-number">{data}</div>
      <span className="programs-list__item-label">Followers</span>
    </div>
  </li>
);
const ProgramShort = React.memo(_ProgramShort);
export default ProgramShort;
