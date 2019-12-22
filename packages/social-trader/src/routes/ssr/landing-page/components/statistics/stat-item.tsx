import React from "react";

interface IStatItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  text: string;
  tag?: string;
}

const _StatItem: React.FC<IStatItemProps> = ({ title, text, tag }) => (
  <li className="stat-list__item">
    <div className="stat-list__item-title">
      {tag && <span className="stat-list__item-tag">{tag}</span>}
      {title}
    </div>
    <div className="stat-list__item-text">{text}</div>
  </li>
);
const StatItem = React.memo(_StatItem);
export default StatItem;
